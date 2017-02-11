// Contracts API

var express = require('express');
var router = express.Router();
var path = require('path');
var request = require('request-promise');
const dockerConfig = require('../config/environments').docker;
const usersDB = require('../db/users.json');

// Example
router.post('/user/login', function onRequest(req, res) {

    console.log(req, res, usersDB);

	// var options = {
	// 	method: 'POST',
	// 	uri: dockerConfig.endpoints.ethereumInterface + '/refugee',
	// 	body: req.body,
	// 	json: true
	// };
    //
	// request(options)
	// 	.then(function (response) {
	// 		console.log('New Contract Created');
	// 		res.jsonp(response);
	// 	})
	// 	.catch(function (error) {
	// 		console.error('Error while creating contract');
	// 		console.error(error);
	// 		res.status(500).jsonp({error: 'Login Failed, incorrect username or password'});
	// 	});
});

router.post('/user/login', function onRequest(req, res) {

    console.log(req.body);

    var options = {
        method: 'POST',
        uri: icecConfig.endpoints.authentication + '/auth/get',
        body: req.body,
        json: true
    };

    request(options)
        .then(function (response) {
            console.log('Login Success');
            res.jsonp(response);
            unlockAccount(response.index, req.body.password);
        })
        .catch(function (error) {
            console.error('Error while login');
            res.status(500).jsonp({error: 'Login Failed, incorrect username or password'});
        });

    function unlockAccount(index, password) {
        var options = {
            method: 'POST',
            uri: icecConfig.endpoints.ethereumInterface + '/accounts/unlock',
            body: { index: index, password: password },
            json: true
        };

        request(options)
            .then(function (response) {
                console.log('Account unlocked');
            })
            .catch(function (error) {
                console.error('Error while unlocking account');
            });
    }
});

module.exports = router;
