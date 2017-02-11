var connector = require('../connection/connector');
var refugeeContract = require('../../definitions/refugeeContract.json');
var parsers = require('../../definitions/refugeeContract.json');

module.exports = {
	getPersonalData1: getPersonalData1,
    getPersonalData2: getPersonalData2,
    getContractAddressByName: getContractAddressByName
};


function getPersonalData1(contractAddress)
{
    var web3 = connector.getConnection();
    var contract = web3.eth.contract(refugeeContract.abiDefinition).at(contractAddress);

    contract.RegisterRefugeePersonalData1({}, { fromBlock: 0, toBlock: 'latest' }).get((error, eventResult) => {
  if (error)
    console.log('Error getting personal data: ' + error);
  else {
    console.log('Personal Data1: ' + JSON.stringify(eventResult));
  }
    });
}

function getPersonalData2(contractAddress)
{
    var web3 = connector.getConnection();
    var contract = web3.eth.contract(refugeeContract.abiDefinition).at(contractAddress);

    contract.RegisterRefugeePersonalData2({}, { fromBlock: 0, toBlock: 'latest' }).get((error, eventResult) => {
  if (error)
    console.log('Error getting personal data: ' + error);
  else {
    console.log('Personal Data2: ' + JSON.stringify(eventResult));
  }
    });
}


function getContractAddressByName(firstName,lastName,documentId)
{
    var web3 = connector.getConnection();

   var options={ fromBlock: 0, toBlock: 'latest',topics:[null,web3.sha3(firstName),web3.sha3(lastName),web3.sha3(documentId)] };

    var filter = web3.eth.filter(options);

    filter.get((error, eventResult) => {
        if (error)
            console.log('Error getting entries: ' + error);
        else {
          //  console.log('Entries: ' + JSON.stringify(eventResult));
            return eventResult.address;
        }
        });

}
