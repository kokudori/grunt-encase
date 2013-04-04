'use strict';

var concat = require('./concat'),
	encasor = require('./encasor');

module.exports = function (grunt) {
	grunt.registerMultiTask('encase',
		'concat and encase multiple JS files in an anonymous \
		function to export any variable or inside an AMD Module',
		function () {
			var result,
				separator = this.data.separator,
				src = concat.concat(this.files, separator, grunt),
				options = {
					enviroment: this.data.enviroment,
					exports: this.data.exports,
					params: this.data.params,
					defines: this.data.defines,
					banner: this.data.banner
				};

			try {
				result = encasor.encase(src, options);
			} catch (e) {
				grunt.fatal(e);
			}
			result = options.banner ? (options.banner + "\n\n" + result) : result;
			grunt.file.write(this.data.dest, result);
			if (this.errorCount)
				return false;
			grunt.log.writeln('Encased File "' + this.data.dest + '" created!');
		}
	);
};