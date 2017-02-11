(function () {
	'use strict';

	angular
		.module('thrust-app')
		.controller('LoginController', LoginController);

	/** @ngInject */
	function LoginController($state, $cookies, logger, authService) {
		var vm = this;

		vm.showMenu = false;
		vm.user = '';
		vm.password = '';
		vm.loginSubmit = loginSubmit;

		initLogin();

		function initLogin() {
			vm.showMenu = false;
			console.log($cookies.get('thrust_connected'));

			if ($cookies.get('thrust_connected')) {
				$state.go('WelcomePage');
			}
		}
		
		function loginSubmit() {
			return authService.login(vm.user, vm.password).then(function(response) {
				if (response.status === 200) {
					logger.success("Welcome " + vm.user);
					$cookies.put('thrust_connected', vm.user);
				}
				
			});
    	}
	}

})();
