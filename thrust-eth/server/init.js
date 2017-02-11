var connector = require('./connection/connector');
var creator = require('./contract/creator');
var retriever = require('./contract/retriever');


var data= {
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
      //creator.createRefugee(data2,"0xb31fef7224759f166bbc715c6b0ff4e557071554");
      // retriever.getPersonalData("0xe5143054d4b084399fe9c05f566e9030443a6a14");//Arturo
      // retriever.getPersonalData("0x8d1d5f8152ec59cef6c4233d88843d4a9fe3b26c");//Juan
      retriever.getContractAddressByName("Arturo","Manzaneda","44793290A");

    }
    , 4000);

   

};
