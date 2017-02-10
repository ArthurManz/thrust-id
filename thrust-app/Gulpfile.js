/* eslint func-names: "off" */

'use strict';

var gulp = require('gulp'),
	rev = require('gulp-rev'),
	templateCache = require('gulp-angular-templatecache'),
	htmlmin = require('gulp-htmlmin'),
	imagemin = require('gulp-imagemin'),
	ngConstant = require('gulp-ng-constant-fork'),
	eslint = require('gulp-eslint'),
	es = require('event-stream'),
	flatten = require('gulp-flatten'),
	del = require('del'),
	wiredep = require('wiredep').stream,
	runSequence = require('run-sequence'),
	browserSync = require('browser-sync'),
	KarmaServer = require('karma').Server,
	plumber = require('gulp-plumber'),
	changed = require('gulp-changed'),
	inject = require('gulp-inject'),
	angularFilesort = require('gulp-angular-filesort'),
	eslint = require('./gulp/eslint'),
	path = require('path'),
	revReplace = require("gulp-rev-replace"),
	bowerFiles = require('main-bower-files'),
	nodemon = require('gulp-nodemon');

var handleErrors = require('./gulp/handleErrors'),
	serve = require('./gulp/serve'),
	build = require('./gulp/build'),
	config = require('./gulp/config');


// we'd need a slight delay to reload browsers
// connected to browser-sync after restarting nodemon
var BROWSER_SYNC_RELOAD_DELAY = 500;

gulp.task('nodemon', function (cb) {
	var called = false;
	return nodemon({

		// nodemon our expressjs server
		script: './app/bin/www',

		// watch core server file(s) that require server restart on change
		watch: ['./app']
	})
		.on('start', function onStart() {
			// ensure start only got called once
			if (!called) { cb(); }
			called = true;
		})
		.on('restart', function onRestart() {
			// reload connected browsers after a slight delay
			setTimeout(function reload() {
				browserSync.reload({
					stream: false
				});
			}, BROWSER_SYNC_RELOAD_DELAY);
		});
});

gulp.task('clean', function () {
	return del([config.path.dist], { dot: true });
});

gulp.task('copy', function () {
	return es.merge(
		gulp.src(path.resolve(__dirname, config.path.bower, 'components-font-awesome/fonts/*.*'))
			.pipe(plumber({ errorHandler: handleErrors }))
			.pipe(changed(config.path.dist + 'static/fonts/'))
			.pipe(gulp.dest(config.path.dist + 'static/fonts/')),
		gulp.src([config.path.src + 'favicon.ico'], { dot: true })
			.pipe(plumber({ errorHandler: handleErrors }))
			.pipe(changed(config.path.dist))
			.pipe(gulp.dest(config.path.dist))
	);
});

gulp.task('images', function () {
	return gulp.src(config.path.src + 'static/images/**')
		.pipe(plumber({ errorHandler: handleErrors }))
		.pipe(changed(config.path.dist + 'static/images'))
		.pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
		.pipe(gulp.dest(config.path.dist + 'static/images'))
		.pipe(browserSync.reload({ stream: true }));
});

gulp.task('styles', [], function () {
	return gulp.src(config.path.src + '**/*.css')
		.pipe(plumber({ errorHandler: handleErrors }))
		.pipe(browserSync.reload({ stream: true }));
});

gulp.task('inject', function () {
	return gulp.src(config.path.src + 'index.html')
		.pipe(plumber({ errorHandler: handleErrors }))
		.pipe(inject(gulp.src(config.path.src + 'app/**/*.js').pipe(angularFilesort()), { relative: true }))
		.pipe(inject(gulp.src(config.path.src + 'app/**/*.css'), { relative: true }))
		.pipe(inject(gulp.src(config.path.src + 'static/css/*.css'), { relative: true }))
		.pipe(inject(gulp.src(bowerFiles(), { read: false }), { name: 'bower', relative: true }))
		.pipe(inject(gulp.src(config.path.tmp + 'templates.js', { read: false }), {
			starttag: '<!-- inject:partials:{{ext}} -->',
			relative: true
		}))
		.pipe(gulp.dest(config.path.src));
});

gulp.task('inject:dev', function () {
	return gulp.src(config.path.src + 'index.html')
		.pipe(plumber({ errorHandler: handleErrors }))
		.pipe(inject(gulp.src(config.path.src + 'app/**/*.js').pipe(angularFilesort()), { relative: true }))
		.pipe(inject(gulp.src(config.path.src + 'app/**/*.css'), { relative: true }))
		.pipe(inject(gulp.src(config.path.src + 'static/css/*.css'), { relative: true }))
		.pipe(inject(gulp.src(bowerFiles(), { read: false }), { name: 'bower', relative: true }))
		.pipe(gulp.dest(config.path.src));
});

gulp.task('wiredep', ['wiredep:test', 'wiredep:app']);

gulp.task('wiredep:app', function () {
	var stream = gulp.src(config.path.src + 'index.html')
		.pipe(plumber({ errorHandler: handleErrors }))
		.pipe(wiredep())
		.pipe(gulp.dest(config.path.src));

	return stream;
});

gulp.task('wiredep:test', function () {
	return gulp.src(config.path.client + 'karma.conf.js')
		.pipe(plumber({ errorHandler: handleErrors }))
		.pipe(wiredep({
			ignorePath: /\.\.\/\.\.\//, // remove ../../ from paths of injected JavaScript files
			devDependencies: true,
			fileTypes: {
				js: {
					block: /(([\s\t]*)\/\/\s*bower:*(\S*))(\n|\r|.)*?(\/\/\s*endbower)/gi,
					detect: {
						js: /'(.*\.js)'/gi
					},
					replace: {
						js: '\'src/{{filePath}}\','
					}
				}
			}
		}))
		.pipe(gulp.dest(config.path.client));
});

gulp.task('assets:prod', ['images', 'styles', 'html'], build);

gulp.task('html', function () {
	return gulp.src(config.path.src + 'app/**/*.html')
		.pipe(plumber({ errorHandler: handleErrors }))
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(templateCache({
			module: 'thrust-app',
			root: 'app/',
			moduleSystem: 'IIFE'
		}))
		.pipe(gulp.dest(config.path.tmp));
});

gulp.task('ngconstant:dev', function () {
	return ngConstant({
		dest: './app.constants.js',
		name: 'thrust-app',
		deps: false,
		noFile: true,
		interpolate: /\{%=(.+?)%\}/g,
		wrap:
		'(function () {\n' +
		'    "use strict";\n' +
		'    // DO NOT EDIT THIS FILE, EDIT THE GULP TASK NGCONSTANT SETTINGS INSTEAD WHICH GENERATES THIS FILE\n' +
		'    {%= __ngModule %}\n' +
		'})();\n',
		constants: {
			// Set DEV constants here
			HELLO: 'Hello'
		}
	})
		.pipe(plumber({ errorHandler: handleErrors }))
		.pipe(gulp.dest('./' + config.path.src + 'app/'));
});

gulp.task('ngconstant:prod', function () {
	return ngConstant({
		dest: './app.constants.js',
		name: 'thrust-app',
		deps: false,
		noFile: true,
		interpolate: /\{%=(.+?)%\}/g,
		wrap:
		'(function () {\n' +
		'    "use strict";\n' +
		'    // DO NOT EDIT THIS FILE, EDIT THE GULP TASK NGCONSTANT SETTINGS INSTEAD WHICH GENERATES THIS FILE\n' +
		'    {%= __ngModule %}\n' +
		'})();\n',
		constants: {
			// Set PRD constants here
			HELLO: 'Hello'
		}
	})
		.pipe(plumber({ errorHandler: handleErrors }))
		.pipe(gulp.dest('./' + config.path.src + 'app/'));
});

// check app for eslint errors
gulp.task('eslint', function () {
	runSequence(eslint.front(), eslint.back());
});

gulp.task('test', ['wiredep:test'], function (done) {
	new KarmaServer({
		configFile: __dirname + config.path.client + 'karma.conf.js',
		singleRun: true
	}, done).start();
});

gulp.task("revreplace", function () {
	var manifest = gulp.src(config.path.dist + "rev-manifest.json");

	return gulp.src(config.path.dist + "index.html")
		.pipe(revReplace({ manifest: manifest }))
		.pipe(gulp.dest(config.path.dist));
});

gulp.task('watch', function () {
	gulp.watch('bower.json', ['install']);
	gulp.watch(config.path.src + '**/*.css', ['styles']);
	gulp.watch(config.path.src + 'statics/images/**', ['images']);
	gulp.watch(path.resolve(config.path.src, 'app/**/*.js'), ['inject:dev']);
	gulp.watch([config.path.src + '*.html', config.path.src + 'app/**/*']).on('change', browserSync.reload);
});

gulp.task('install', function () {
	runSequence(['wiredep'], 'inject:dev');
});

gulp.task('serve', function () {
	runSequence('install', 'nodemon', serve);
});

gulp.task('build', ['clean'], function (cb) {
	runSequence(['copy', 'wiredep:app'], 'inject', 'assets:prod', 'revreplace', cb);
});

gulp.task('default', ['serve']);
