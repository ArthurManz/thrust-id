(function () {
	'use strict';

	// Data Service Factory used for Authentication
	angular
		.module('thrust-app')
		.factory('authService', authService);

	/** @ngInject */
	function authService($http, logger) {

		var service = {
			login: login
		};

		return service;

		////////////

		function login(user, password) {
			return $http.post('/api/user/login', { name: user, password: password })
				.then(loginSucceeded)
				.catch(loginFailed);

			function loginSucceeded(response) {
				return response.data;
			}

			function loginFailed(error) {
				logger.error('XHR Failed for Login.');
				logger.log(error.data);
			}
		}
	}

})();
