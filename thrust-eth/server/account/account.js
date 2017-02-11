var userDatabase = require('../../db/users.json');


module.exports = {
	getAccountAddress: getAccountAddress
};


function getAccountAddress(userId)
{
    var userDetails=userDatabase[userId];

    if(userDetails === undefined)
    {
        onsole.log("User Id not found.");
        return "";
    }

    return userDetails.address;
}