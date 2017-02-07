(function() {
	'use strict';

	angular
		.module('thrust-app')
		.factory('logger', logger);

	logger.$inject = ['$log', 'toastr'];

	function logger($log, toastr) {
		var service = {
			showToasts: true,

			error   : error,
			info    : info,
			success : success,
			warning : warning,

			// straight to console; bypass toastr
			// if you still would like to only log error, warning or info use onlyLog argument
			log     : $log.log,
			debug   : $log.debug
		};

		return service;
		/////////////////////

		function error(message, data, onlyLog, title) {
			if (typeof onlyLog === 'undefined') {
				toastr.error(message, title);
			}
			$log.error('Error: ' + message, data);
		}

		function info(message, data, onlyLog, title) {
			if (typeof onlyLog === 'undefined') {
				toastr.info(message, title);
			}
			$log.info('Info: ' + message, data);
		}

		function success(message, data, onlyLog, title) {
			if (typeof onlyLog === 'undefined') {
				toastr.success(message, title);
			}
			$log.info('Success: ' + message, data);
		}

		function warning(message, data, onlyLog, title) {
			if (typeof onlyLog === 'undefined') {
				toastr.warning(message, title);
			}
			$log.warn('Warning: ' + message, data);
		}
	}
}());
