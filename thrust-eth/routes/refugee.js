var express = require('express');
var router = express.Router();
var creator = require('../server/contract/creator');
var account = require('../server/account/account');

// Refugee API
router.post('/refugee', function (req, res) {
	// Create new refugee contract

	var address=account.getAccountAddress(req.userId);
	creator.createRefugee(req.body,address);
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
