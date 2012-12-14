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
		if (!exports)
			grunt.fatal('exports option is empty.');

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

		return '(function(undefined) {\n' + content + '\n' + output + '\n}).apply(this);';
	});

	grunt.registerMultiTask('encase', 'Connecting the individual files, encased in an anonymous function to export any variable.', function () {
		var files = grunt.file.expandFiles(this.file.src);
		var src = grunt.helper('concat', files, { separator: this.data.separator });

		src = grunt.helper('encase', src, {
			enviroment: this.data.enviroment,
			exports: this.data.exports
		});

		grunt.file.write(this.file.dest, src);

		if (this.errorCount) { return false; }

		grunt.log.writeln('File "' + this.file.dest + '" created.');
	});
};