(function () {
	'use strict';

	angular
		.module('thrust-app')
		.controller('LoginController', LoginController);

	/** @ngInject */
	function LoginController($state, $cookies, logger) {
		var vm = this;

		vm.showMenu = false;
		vm.user = '';
		vm.password = '';
		vm.loginSubmit = loginSubmit;

		initLogin();

		function initLogin() {
			vm.showMenu = false;
			console.log($cookies.getObject('thrust_connected'));

			if ($cookies.getObject('thrust_connected')) {
				logger.info("Connected!");
				//$state.go('Main Page');
			}
		}

		function loginSubmit() {
			
		}
	}
})();
