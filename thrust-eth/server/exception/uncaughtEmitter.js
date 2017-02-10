module.exports = {
	listenForException: listenForException
};

var callbacks = [];

function listenForException(callback) {
	callbacks.push(callback);
}

function isFunction(functionToCheck) {
	var getType = {};
	return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

process.on('uncaughtException', function (error) {
	setTimeout(function (error) {
		for (var callback in callbacks) {
			if (isFunction(callbacks[callback])) {
				callbacks[callback](error);
			}
		}

		callbacks = [];
		console.error('Uncaught exception detected: ' + error);
	}, 50000, error);
});
