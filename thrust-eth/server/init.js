var connector = require('./connection/connector');
var creator = require('./contract/creator');
var retriever = require('./contract/retriever');


var data1= {
  "firstName": "Arturo",
  "lastName": "Manzaneda",
  "documentId": "44793290A",
  "documentType": "ID",
  "birthDate": "1988-05-10",
  "civilStatus": "Single",
  "gender": "Male",
  "fingerprintHash": "1929233838383833848484848484844747474",
  "photoHash": "3393939393939393939384746758484448488",
  "registrationCountry": "Netherlands",
  "originCountry": "Syria",
  "bloodGroup": "A"
};

var data2= {
  "firstName": "Juan",
  "lastName": "Manuel",
  "documentId": "12343",
  "documentType": "ID",
  "birthDate": "1988-05-10",
  "civilStatus": "Single",
  "gender": "Male",
  "fingerprintHash": "1929233838383833848484848484844747474",
  "photoHash": "3393939393939393939384746758484448488",
  "registrationCountry": "Netherlands",
  "originCountry": "Syria",
  "bloodGroup": "A"
};

module.exports = function init() {
    // All initial connection and/or configuration should be placed in here
    var web3=connector.initConnection();

    setTimeout(function()
    { 
  //    creator.createRefugee(data2,"0xcf7a93582ad21a097a27d60178d03fa81ce1d790");
  //    creator.createRefugee(data1,"0xcf7a93582ad21a097a27d60178d03fa81ce1d790");

 
    retriever.getPersonalData(retriever.getContractAddressByName("Juan","Manuel","12343"))
  
  
    retriever.getPersonalData(retriever.getContractAddressByName("Arturo","Manzaneda","44793290A"))


      
    }
    , 4000);

   

};
