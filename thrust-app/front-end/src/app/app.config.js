/* eslint no-param-reassign: "warn" */
(function () {
	'use strict';

	angular
		.module('thrust-app')
		.config(config);

	/** @ngInject */
	function config($logProvider, $httpProvider, toastrConfig) {
		// Enable log
		$logProvider.debugEnabled(true);

		$httpProvider.defaults.useXDomain = true;
		delete $httpProvider.defaults.headers.common['X-Requested-With'];

		// Set options third-party lib
		toastrConfig.allowHtml = true;
		toastrConfig.timeOut = 3000;
		toastrConfig.positionClass = 'toast-bottom-right';
		toastrConfig.preventDuplicates = false;
		toastrConfig.progressBar = true;
	}
}());
