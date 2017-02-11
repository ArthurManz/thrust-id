  (function () {
	'use strict';

	angular
		.module('thrust-app')
		.controller('MenuController', MenuController);

	/** @ngInject */
	function MenuController($scope, $state, $cookies) {
		var vm = this;

		$scope.isLoggedIn = isLoggedIn;
        $scope.logOut = function logOut() {
            console.log("logout");
            $cookies.remove('thrust_connected');
            $cookies.remove('user');
            $state.go('login');
        };

        $scope.userName = "Test";
        $scope.currentState = $state.current.name;

        console.log($state.current.name);

        console.log("Hello Controller");

        function isLoggedIn() {
            let userObject = $cookies.getObject('thrust_connected');
            if (userObject === undefined) {
                return false;
            }
            $scope.userName = $cookies.get('user')
             console.log($scope.userName);
            return true;
        }

        
    }

})();
