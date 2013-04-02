'use strict';

var encasor = module.exports = {};

encasor.encase = function(content, options, grunt) {
						
	var exports = options.exports,
		params = (options.params || {}),
		defines = (options.defines || {}),
		encasedFileContent = "";

	if (!exports)
		grunt.fatal('exports option is empty.');
		
	// params could be be undefined, 
	// but if present in the config, they should be of type object	
	if (typeof params != 'object')
		grunt.fatal('params option needs to be an object.');	
		
	// defines could be be undefined, 
	// but if present in the config, they should be of type object	
	if (typeof defines != 'object')
		grunt.fatal('defines option needs to be an object.');			
		
	var enviroment = (function () {
		if (options.enviroment === 'node')
			return 'node';
		else if (options.enviroment === 'browser')
			return 'browser';
		return 'browser';
	})();


	var output = (function () {
		if (enviroment === 'node') {
			if (exports instanceof Array)
				return 'module.exports = { ' + exports.map(function (name) {
					return name + ': ' + name;
				}).join(', ') + ' }';
			// exports.name = value or exports = value
			return 'module.exports.' + exports + ' = ' + exports;
		}
		if (exports instanceof Array)
			return exports.map(function (name) {
				return 'window.' + name + ' = ' + name;
			}).join('\n');
		return 'window.' + exports + ' = ' + exports;
	})();
	
	
	if(Object.keys(defines).length !== 0) {
		// wrap the file content into an AMD module's 'define' function
		var prepend = (function(o) {
			var str = "define(["; 
			
			var keys = Object.keys(o);
			for(var i=0; i<keys.length; i++) {
				str = str + "'" + keys[i] + "'";
				if(i !== (keys.length - 1)) {
					str = str + ",";	
				}
			}
			str = str + "], function(";
			
			var vals=[];
			for(var k in o) vals.push(o[k]); 
			str = str + vals.join(", ") + ") { \n";
			
			return str;
		})(defines);
		var append = "\n});";
		
		encasedFileContent = prepend + content + '\n' + output + append;
	}
	else {
		// wrap the file content into an IIFE
		var functionCallerParamsStr = Object.keys(params).join(",");

		var functionParamsStr = (function(o) {
			var vals=[];
			for(var k in o) vals.push(o[k]); 
			vals = vals.join(",");
			return (vals.length == 0 ? "undefined" : vals + ",undefined");
		})(params);	
			
		encasedFileContent = '(function(' + functionParamsStr + ') {\n' + content + '\n' + output + '\n})(' + functionCallerParamsStr + ');';
	}
	
	return encasedFileContent;
};