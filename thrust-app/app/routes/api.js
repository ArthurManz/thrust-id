// Contracts API

var express = require('express');
var router = express.Router();
var path = require('path');
var request = require('request-promise');
const dockerConfig = require('../config/environments').docker;

// Example
router.post('/contract/create', function onRequest(req, res) {

	var options = {
		method: 'POST',
		uri: dockerConfig.endpoints.ethereumInterface + '/contracts/create',
		body: req.body,
		json: true
	};

	request(options)
		.then(function (response) {
			console.log('New Contract Created');
			res.jsonp(response);
		})
		.catch(function (error) {
			console.error('Error while creating contract');
			console.error(error);
			res.status(500).jsonp({error: 'Login Failed, incorrect username or password'});
		});
});

module.exports = router;
