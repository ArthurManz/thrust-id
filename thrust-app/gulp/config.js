/**
 *  This file contains the variables used in other gulp files
 *  which defines tasks
 *  By design, we only put there very generic config values
 *  which are used in several places to keep good readability
 *  of the tasks
 */

exports.path = {
		client: 'front-end/',
		src: 'front-end/src/',
		dist: 'app/client/',
		tmp: 'front-end/src/.tmp/',
		e2e: 'front-end/test/e2e/',
		js: 'front-end/src/app/**/*!(.spec.js).js',
		client_unit: 'front-end/test/unit/',
		bower: '/front-end/src/bower_components/'
};

// Port use to serve the front-end
exports.port = 9000;
