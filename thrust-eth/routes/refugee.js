var express = require('express');
var router = express.Router();
var creator = require('../server/contract/creator');
var account = require('../server/account/account');

// Refugee API
router.post('/refugee', function (req, res) {
	console.log("Create refugee with data:", req.body);
	// Create new refugee contract
	creator.createRefugee(req.body, "0x7c0fa4e06a673a730c94ad944db019a234a47ff6");
	res.jsonp({ status: 'Creating contract' });
});

router.get('/refugee', function (req, res) {
	// Return refugee depending on req parameters
	// TODO: IMPLEMENT THIS
	res.jsonp("Hello World");
});

router.post('/refugee/{refugeeId}', function (req, res) {
	var promise = refugeeModification.listForUser(req.body.id);

	promise.then(function(response) {
		res.jsonp(response);
	}, function(errors) {
		res.jsonp(errors);
	});
});

router.get('/refugee/{refugeeId}', function (req, res) {
	var promise = refugeeDetails.getAllDetails(req.body.id);

	promise.then(function(response) {
		res.jsonp(response);
	}, function(errors) {
		res.jsonp(errors);
	});
});

module.exports = router;
