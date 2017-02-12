// Contracts API

var express = require('express');
var router = express.Router();
var path = require('path');
var request = require('request-promise');
const dockerConfig = require('../config/environments').docker;
const usersDB = require('../db/users.json');

router.post('/user/login', function onRequest(req, res) {

    let user = req.body.name;
    let password = req.body.password;

    if(user === undefined || password === undefined) {
        return res.status(400).send('Missing body parameters');
    } 

    if (usersDB[user] === undefined) {
        return res.status(404).send('Not found');
    }

    if (usersDB[user].password !== password) {
        return res.status(401).send('Incorrect user name or password');
    }

    res.status(200).send(JSON.stringify(usersDB[user]));

});

router.post('/refugee', function onRequest(req, res) {

    console.log(req.body);

    var options = {
		method: 'POST',
		uri: dockerConfig.endpoints.ethereumInterface + '/refugee',
		body: req.body,
		json: true
	};

	request(options)
		.then(function (response) {
			console.log('New Refugee Created');
			res.jsonp(response);
		})
		.catch(function (error) {
			console.error('Error while creating contract');
			console.error(error);
			res.status(500).jsonp({error: 'Something went wrong creating Smart Contract'});
		});
});

module.exports = router;
