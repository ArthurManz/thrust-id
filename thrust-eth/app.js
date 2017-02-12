'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var init = require('./server/init');
var refugee = require('./routes/refugee');

var app = express();

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Routing
app.use('/', refugee);

// Error Handlers
app.use(function (err, req, res, next) {
	res.status(err.status || 500).send({
		message: err.message,
		error: err.stack
	});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// Initialise
init();

module.exports = app;
