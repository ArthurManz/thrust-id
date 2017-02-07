(function () {
	'use strict';

	angular
		.module('thrust-app')
		.directive('thrustNavbar', thrustNavbar);

	/** @ngInject */
	function thrustNavbar() {
		var directive = {
			restrict: 'E',
			templateUrl: 'app/components/navbar/navbar.html',
			scope: {},
			controller: NavbarController,
			controllerAs: 'nav'
		};

		return directive;

		/** @ngInject */
		function NavbarController($state, $cookies) {
			var vm = this;

			vm.isActive = isActive;
			vm.logout = logout;

			function isActive() {
				return Boolean($cookies.get('thrust_connected'));
			}

			function logout() {
				$cookies.remove('thrust_connected');
				$state.go('home');
			}
		}
	}
})();
