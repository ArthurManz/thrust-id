var config = require('../../config/node-config.js');
var Web3Lib = require('web3');
var Q = require('q');
var web3;

module.exports = {
	getConnection: getConnection,
	initConnection: initConnection
};

/**
 * Retrieves the connection to ethereum object
 * @returns {Object} - returns the instance of Web3Lib
 */
function getConnection() {
	return web3;
}

/**
 * Initiates an async connection to the blockchain
 */
function initConnection() {
	connect(config.provider).then(function onConnected(connection) {
		web3 = connection;
		console.log('Connected');
	});
}

/**
 * Connects to a blockchain async by a given url
 *
 * @param {String} providerUrl url for blockchain
 * @returns {Promise<Object, Error>} - A promise which if resolved returns an instance of Web3Lib
 */

function connect(providerUrl) {
	var web3 = new Web3Lib();
	var provider = new web3.providers.HttpProvider(providerUrl);
	var deferred = Q.defer();

	web3.setProvider(provider);
	console.info('Connecting Web3 to Ethereum with provider: ' + providerUrl);

	// Wait till connection is stablished
	Q.when(web3.isConnected(), function onConnected(succeeded) {
		if (succeeded) {
			console.info('Web3 connection created with provider: ' + providerUrl);
			deferred.resolve(web3);
		} else {
			console.error('Failed to connect.');
			deferred.reject(succeeded);
		}
	});

	return deferred.promise;
}
