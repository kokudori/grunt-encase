'use strict';

var concat = require('./concat'),
	encasor = require('./encasor');

module.exports = function (grunt) {
	
	grunt.registerMultiTask('encase', 
		"concat and encase multiple JS files in an anonymous \
		function to export any variable or inside an AMD Module", 
		function () {
			var src,
				separator = this.data.separator,
				options = {
					enviroment: this.data.enviroment,
					exports: this.data.exports,
					params: this.data.params,
					defines: this.data.defines
				};

			// Concat Files
			src = concat.concat(this.files, separator, grunt);
			// Encase src
			src = encasor.encase(src, options, grunt);
			grunt.file.write(this.data.dest, src);
			if (this.errorCount) { return false; }
			grunt.log.writeln('Encased File "' + this.data.dest + '" created!');
		}
	);
};