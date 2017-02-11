(function () {
	'use strict';

	angular
		.module('thrust-app')
		.config(routerConfig);

	/** @ngInject */
	function routerConfig($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'app/login/login.html',
				controller: 'LoginController',
				controllerAs: 'login'
			})
			.state('register', {
				url: '/register',
				templateUrl: 'app/register/register.html',
				controller: 'RegisterController',
				controllerAs: 'vm'
			});

		$urlRouterProvider.otherwise('/');
	}
}());
