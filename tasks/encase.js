/*
 * grunt
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman
 * Licensed under the MIT license.
 * https://github.com/gruntjs/grunt/blob/master/LICENSE-MIT
 */


var fs = require('fs'),
	path = require('path');

module.exports = function (grunt) {
	grunt.registerHelper('encase', function (content, options) {
		var exports = options.exports;
		var params = (options.params || {});
		var defines = (options.defines || {});
		var encasedFileContent = "";

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
		
		var functionCallerParamsStr = Object.keys(params).join(",");
		
		var functionParamsStr = (function(o) {
			var vals=[];
			for(var k in o) vals.push(o[k]); 
			vals = vals.join(",");
			return (vals.length == 0 ? "undefined" : vals + ",undefined");
		})(params);		
		encasedFileContent = '(function(' + functionParamsStr + ') {\n' + content + '\n' + output + '\n})(' + functionCallerParamsStr + ');';
		
		return encasedFileContent;
	});

	grunt.registerMultiTask('encase', 'Connecting the individual files, encased in an anonymous function to export any variable.', function () {
		var files = grunt.file.expandFiles(this.file.src);
		var src = grunt.helper('concat', files, { separator: this.data.separator });

		src = grunt.helper('encase', src, {
			enviroment: this.data.enviroment,
			exports: this.data.exports,
			params: this.data.params,
			defines: this.data.defines
		});

		grunt.file.write(this.file.dest, src);

		if (this.errorCount) { return false; }

		grunt.log.writeln('File "' + this.file.dest + '" created.');
	});
};