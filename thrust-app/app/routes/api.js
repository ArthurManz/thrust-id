// Contracts API

var express = require('express');
var router = express.Router();
var path = require('path');
var request = require('request-promise');
const dockerConfig = require('../config/environments').docker;
const usersDB = require('../db/users.json');

// Example
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
    
    res.status(200).send('Login succesfully');

});

module.exports = router;
