var connector = require('../connection/connector');
var refugeeContract = require('../../definitions/refugeeContract.json');

module.exports = {
	getPersonalData: getPersonalData,
    getContractAddressByName: getContractAddressByName
};


function getPersonalData(contractAddress)
{
    var web3 = connector.getConnection();
    var contract = web3.eth.contract(refugeeContract.abiDefinition).at(contractAddress);

    contract.RegisterRefugeePersonalData1({}, { fromBlock: 0, toBlock: 'latest' }).get((error, eventResult) => {
  if (error)
    console.log('Error getting personal data: ' + error);
  else {
    console.log('Personal Data: ' + JSON.stringify(eventResult));
  }
    });
}

function getContractAddressByName(firstName,lastName,documentId)
{
    var web3 = connector.getConnection();

   // var options={ fromBlock: 0, toBlock: 'latest',topics:[firstName,lastName,documentId] };
    var options={ fromBlock: 0, toBlock: 'latest'};

    var filter = web3.eth.filter(options);

    filter.get((error, eventResult) => {
        if (error)
            console.log('Error getting entries: ' + error);
        else {
            console.log('Entries: ' + JSON.stringify(eventResult));
        }
        });


}
