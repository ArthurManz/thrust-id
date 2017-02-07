// Index API

var express = require('express');
var router = express.Router();
var path = require('path');

var index = '/../../front-end/src';

if (process.argv[2] !== 'dev' ) {
	var index = '/../client';
}

var baseDirectory = path.resolve(__dirname + index);

router.get('/', function onRequest(req, res) {
	res.sendFile(baseDirectory + '/index.html');
});

module.exports = router;
