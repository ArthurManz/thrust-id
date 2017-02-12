var connector = require('../connection/connector');
var refugeeContract = require('../../definitions/refugeeContract.json');


module.exports = {
	createRefugee: createRefugee
};


function createRefugee(inputData, accountAddress)
{
	var web3 = connector.getConnection();

	web3.eth.contract(refugeeContract.abiDefinition).new(
		{
			from: accountAddress,
			data: refugeeContract.bytecode,
			gas: 4000000
		}, logEvents);

	console.log('Creating contract.');
	
	function logEvents(error, contract) {
		if (error) {
			console.log("Error occurred: " + error);
		} else if (contract.address != undefined) {
			console.log("Contract deployed: " + contract.address);
			initializeContractInfo(contract, inputData,accountAddress);		
		}
	}
}

function initializeContractInfo(contract, inputData,accountAddress) {
	var web3 = connector.getConnection();

	var firstName = inputData.firstName;
    var lastName = inputData.lastName;
    var documentId = inputData.documentId;
    var documentType = inputData.documentType;
    var birthDate = inputData.birthDate;
    var civilStatus = inputData.civilStatus;
    var gender = inputData.gender;
    var fingerprintHash = inputData.fingerprintHash;
    var photoHash = inputData.photoHash;
    var originCountry = inputData.originCountry;
    var bloodGroup = inputData.bloodGroup;

    var rightNow = new Date();
    var dateCreated = rightNow.toISOString().slice(0,10).replace(/-/g,"");

	contract.setPersonalData.sendTransaction(firstName, lastName, gender,
		bloodGroup, birthDate, originCountry, civilStatus,documentType,documentId,fingerprintHash,photoHash,dateCreated,"Refugee Registration",
         { from: accountAddress, gas: 99999999999 }, logResponse);
    }

    function logResponse(error, response) {
	if (error) {
		console.log("Error occurred: " + error);
	} else {
		console.log("Values set: " + response);
	}
}
