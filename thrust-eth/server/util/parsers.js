module.exports = {
	encodeAsHex: encodeAsHex,
	hexToAscii: hexToAscii,
	intToDate: intToDate,
	stringToInt: stringToInt
};

function hexToAscii(str1) {
	if (str1 === undefined) {
		return str1;
	}

	var hex = str1.toString();
	if (hex.substring(0, 2) === "0x") {
		hex = hex.substr(2);
	}

	var str = '';
	for (var n = 0; n < hex.length; n += 2) {
		if (hex.substr(n, 2) === "00") {
			return str;
		}
		str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
	}

	return str;
}

function encodeAsHex(input) {
	var hex;
	var i;

	var result = "";
	for (i = 0; i < input.length; i++) {
		hex = input.charCodeAt(i).toString(16);
		result += hex;
	}

	return result;
}

function convertFromHex(hex) {
	var hex = hex.toString();
	var str = '';

	for (var i = 0; i < hex.length; i += 2) {
		str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
	}
	return str;
}

function intToDate(val) {
	return new Date(parseInt(val) * 1000).toISOString();
}

function stringToInt(val) {
	return parseInt(val.toString());
}
