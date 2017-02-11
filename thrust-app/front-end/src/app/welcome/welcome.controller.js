  (function () {
	'use strict';

	angular
		.module('thrust-app')
		.controller('WelcomeController', WelcomeController);

	/** @ngInject */
	function WelcomeController($state, $cookies, $timeout, $rootScope, $mdSidenav) {
		var vm = this;

		vm.customWelcome = getEntity();
        vm.entity = "";

        function getEntity() {
            let userObject = $cookies.getObject('thrust_connected');
            vm.entity = userObject.entity;
            return vm.entity.toLowerCase();
        }
        vm.toggleLeft = buildToggler('left');
        vm.toggleRight = buildToggler('right');

        function buildToggler(componentId) {
            return function() {
                $mdSidenav(componentId).toggle();
            };
        }

		initLogin();

		function initLogin() {
			vm.showMenu = false;
			console.log($cookies.get('thrust_connected'));

			if ($cookies.get('thrust_connected') === undefined) {
				$state.go('login');
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
