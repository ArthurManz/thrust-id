'use strict';

var gulp = require('gulp');
var config = require('./config');
var errorHandler = require('./handleErrors');

var eslint = require('gulp-eslint');
var plumber = require('gulp-plumber');

// TODO: Need to add back end file to lint!

module.exports = {
	front: front,
	back: back
};

function front() {
	return gulp.src(['gulpfile.js', config.path.src + 'app/**/*.js'])
		.pipe(plumber({errorHandler: errorHandler}))
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failOnError());
}

function back() {
	return gulp.src(['app/**/*.js', '!'])
		.pipe(plumber({errorHandler: errorHandler}))
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failOnError());
}
