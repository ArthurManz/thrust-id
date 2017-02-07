'use strict';

// External Modules
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var path = require('path');

// Internal router modules
var index = require('./routes/index');
var contracts = require('./routes/api');

var app = express();

var baseDirectory = path.resolve(__dirname);
var front = path.join(__dirname, '../');

// If environment is dev use front-end folder, otherwise use /client folder (created by Gulp build)
if (process.argv[2] !== 'dev' ) {
	app.use(express.static(baseDirectory + '/client/'));
} else {
	console.log('Dev environment, client from front-end folder');
	app.use(express.static(front + '/front-end/'));
}

// Logger
app.use(logger('dev'));

// Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Routing of the server
app.use('/', index);
app.use('/api', contracts);

// Error Handlers
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: err
	});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

module.exports = app;
