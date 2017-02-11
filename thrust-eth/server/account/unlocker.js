var connector = require('../connection/connector');

var UNLOCKED_DURATION_SEC = 10000;

module.exports = {
	unlockAccount: unlockAccount
};

/**
* Unlocks an ethereum account
*
* @param {{ index:Number, password:String }} queryData Account credentials 
* @returns {String} The unlocked account address
*/

function unlockAccount(accountAddress,accountPassword) {
	var address;
	var web3 = connector.getConnection();

	if (web3.eth.accounts.length === 0) {
		console.error('No Account found on the connected provider');
		return null;
	}

	console.log('Unlocking Account: ' + address + '...');
	web3.personal.unlockAccount(accountAddress, accountPassword, UNLOCKED_DURATION_SEC);
	console.log('Account ' + address + ': Unlocked!');

	return address;
}

