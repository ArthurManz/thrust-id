(function () {
	'use strict';

	angular
		.module('thrust-app')
		.controller('LoginController', LoginController);

	/** @ngInject */
	function LoginController($state, $cookies, logger, authService, $rootScope) {
		var vm = this;

		vm.user = '';
		vm.password = '';
		vm.loginSubmit = loginSubmit;

		initLogin();

		function initLogin() {
			$rootScope.isLogin = true;
			console.log($cookies.getObject('thrust_connected'));

			if ($cookies.getObject('thrust_connected') !== undefined ) {
				$rootScope.isLogin = false;
				$state.go('WelcomePage');
			}
		}
		
		function loginSubmit() {
			return authService.login(vm.user, vm.password).then(function(response) {
				if (response.status === 200) {
					logger.success("Welcome " + vm.user);
					$cookies.putObject('thrust_connected', response.data);
					$cookies.put('user', vm.user);
					$state.go('WelcomePage');
				}
			});
    	}
	}

})();
