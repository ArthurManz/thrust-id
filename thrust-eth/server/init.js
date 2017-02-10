var connector = require('./connection/connector');

module.exports = function init() {
    // All initial connection and/or configuration should be placed in here
	connector.initConnection();
};
