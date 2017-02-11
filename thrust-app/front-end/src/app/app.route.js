(function () {
	'use strict';

	angular
		.module('thrust-app')
		.config(routerConfig);

	/** @ngInject */
	function routerConfig($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state('login', {
				url: '/',
				templateUrl: 'app/login/login.html',
				controller: 'LoginController',
				controllerAs: 'login'
			})
			.state('WelcomePage', {
				url: '/welcome',
				templateUrl: 'app/welcome/welcome.html',
				controller: 'WelcomeController',
				controllerAs: 'vm'
			})
			.state('register', {
				url: '/register',
				templateUrl: 'app/register/register.html',
				controller: 'RegisterController',
				controllerAs: 'vm'
			})
			.state('details', {
				url: '/details/:refId',
				templateUrl: 'app/register/register.html',
				controller: 'RegisterController',
				controllerAs: 'vm'
			});

		$urlRouterProvider.otherwise('/');

	}
}());
