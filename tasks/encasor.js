'use strict';

exports.encase = function (content, options) {
	var exports = options.exports,
		params = options.params || {},
		defines = options.defines || {},
		useAMD = Object.keys(defines).length !== 0;

	if (!exports)
		throw 'exports option is empty.';
	if (typeof params !== 'object')
		throw 'params option needs to be an object.';
	if (typeof defines !== 'object')
		throw 'defines option needs to be an object.';

	var strict = options.useStrict ? "'use strict';" : '';
	var enviroment = (function () {
		if (options.enviroment === 'node')
			return 'node';
		if (options.enviroment === 'browser' || typeof options.enviroment === 'undefined')
			return 'browser';
		throw 'enviroment option needs "node" or "browser".';
	})();
	var output = (function () {
		if (useAMD) {
			if (exports instanceof Array) {
				return exports.map(function (name) {
					return 'exports.' + name + ' = ' + name + ';';
				}).join('\n');
			}
			return 'return ' + exports + ';';
		}
		if (enviroment === 'node') {
			if (exports instanceof Array) {
				return 'module.exports = { ' + exports.map(function (name) {
					return name + ': ' + name;
				}).join(', ') + ' };';
			}
			return 'module.exports.' + exports + ' = ' + exports + ';';
		}
		var tranditional = (function () {
			if (exports instanceof Array) {
				return exports.map(function (name) {
					return 'window.' + name + ' = ' + name + ';';
				}).join('\n');
			}
			return 'window.' + exports + ' = ' + exports + ';';
		})();
		var amd = (function () {
			if (exports instanceof Array) {
				return exports.map(function (name) {
					return 'exports.' + name + ' = ' + name + ';';
				}).join('\n');
			}
			return 'return ' + exports + ';';
		})();
		var conditional = "if (typeof define === 'function' && typeof define.amd === 'object') {\n";
		return conditional + 'define(function(exports) { ' + amd + ' });' + '\n} else {\n' + tranditional + '\n}';
	})();

	var result = (function () {
		if (useAMD) {
			var prepend = (function (defines) {
				// Add the exports object
				if (exports instanceof Array) {
					defines['exports'] = 'exports';
				}

				var names = Object.keys(defines);
				return 'define([' + names.map(function (name, i) {
					return "'" + name + "'";
				}).join(', ') + '], function(' + names.map(function (name) {
					return name;
				}).join(', ') + ') {\n';
			})(defines);

			return prepend + strict + '\n' + content + '\n' + output + '\n});';
		}

		// wrap the file content into an IIFE
		var functionCallerParamsStr = (function () {
			var names = Object.keys(params);
			if (options.useStrict)
				names = ['this'].concat(names);
			return names.join(', ');
		})(),
			functionParamsStr = (function (params) {
				var names = Object.keys(params);
				if (names.length === 0)
					return 'undefined';
				return names.map(function (name) {
					return params[name];
				}).join(', ') + ', undefined';
			})(params);
		var func = '(function(' + functionParamsStr + ') {\n' + strict + '\n' + content + '\n' + output + '\n})';
		if (options.useStrict)
			func += '.call(' + functionCallerParamsStr + ');';
		else
			func += '(' + functionCallerParamsStr + ');';
		return func;
	})();
	return options.banner ? (options.banner + '\n\n' + result) : result;
};