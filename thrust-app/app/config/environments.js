'use strict';

// TODO: Add this to npm scripts so we can use one or the other, now it is fixed in api.js to use ICEC server!

var environments = {
	docker: {
		endpoints: {
			ethereumInterface: 'http://localhost:5002'
		}
	}
};

module.exports = environments;
