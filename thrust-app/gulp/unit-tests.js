'use strict';

var gulp = require('gulp');
var conf = require('../config/gulp-config');
var appConfig = conf.appConfig;

var sync = require('run-sequence');
var plumber = require('gulp-plumber');
var mocha = require('gulp-mocha');

gulp.task('test', function (done) {
	sync('eslint', 'mocha', done);
});

gulp.task('mocha', function () {
	return gulp.src(appConfig.paths.tests, { read: false })
		.pipe(plumber({ errorHandler: conf.errorHandler }))
		// gulp-mocha needs filepaths so you can't have any plugins before it
		.pipe(mocha());
});
