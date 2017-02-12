(function () {
	'use strict';

	// Data Service Factory used for Authentication
	angular
		.module('thrust-app')
		.factory('refugeeService', refugeeService);

	/** @ngInject */
	function refugeeService($http, $cookies, logger) {

		var service = {
			create: create
		};

		return service;

		////////////

		function create(refugeeObject) {
			return $http.post('/api/refugee', refugeeObject)
				.then(createSucceeded)
				.catch(createFailed);

			function createSucceeded(response) {
				return response;
			}

			function createFailed(error) {
				logger.error('Something went wrong :(');
				logger.log(error.data);
			}
		}
	}

})();
