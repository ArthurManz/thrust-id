var gulp = require('gulp'),
	url = require('url'),
	browserSync = require('browser-sync'),
	proxy = require('proxy-middleware');

var config = require('./config');

module.exports = function () {
	var proxyOptions = url.parse('http://localhost:9001/api');
	proxyOptions.route = '/api';

	browserSync({
		open: true,
		port: config.port,
		server: {
			baseDir: config.path.src,
			middleware: [proxy(proxyOptions)]
		}
	});

	gulp.start('watch');
};
