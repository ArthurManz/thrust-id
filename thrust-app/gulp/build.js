var fs = require('fs'),
    gulp = require('gulp'),
    lazypipe = require('lazypipe'),
    footer = require('gulp-footer'),
    sourcemaps = require('gulp-sourcemaps'),
    rev = require('gulp-rev'),
    htmlmin = require('gulp-htmlmin'),
    ngAnnotate = require('gulp-ng-annotate'),
    prefix = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    useref = require("gulp-useref"),
    plumber = require('gulp-plumber'),
    gulpIf = require('gulp-if'),
    handleErrors = require('./handleErrors');

var config = require('./config');

var initTask = lazypipe()
    .pipe(sourcemaps.init)
    .pipe(footer, ';');
var jsTask = lazypipe()
    .pipe(ngAnnotate)
    .pipe(uglify);
var cssTask = lazypipe()
    .pipe(prefix)
    .pipe(cssnano);

module.exports = function() {
    var templates = fs.readFileSync(config.path.tmp + 'templates.js');
	var manifest = gulp.src(config.path.dist + "rev-manifest.json");

    return gulp.src([config.path.src + '**/*.html',
        '!' + config.path.src + 'app/**/*.html'])
        .pipe(plumber({errorHandler: handleErrors}))
        //init sourcemaps and prepend semicolon
        .pipe(useref({}, initTask))
        //append html templates
        .pipe(gulpIf('**/app.js', footer(templates)))
        .pipe(gulpIf('*.js', jsTask()))
        .pipe(gulpIf('*.css', cssTask()))
        .pipe(gulpIf('*.html', htmlmin({collapseWhitespace: true})))
        .pipe(gulpIf('**/*.!(html)', rev()))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.path.dist))
		.pipe(rev.manifest())
		.pipe(gulp.dest(config.path.dist));
};
