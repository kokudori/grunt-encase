'use strict';

var concat = module.exports = {};

concat.concat = function (files, separator, grunt) {
	var src = '';
	// Iterate over all specified file groups.
	files.forEach(function(f) {
		// Concat specified files.
		src = f.src.filter(function(filepath) {
			// Warn on and remove invalid source files (if nonull was set).
			if (!grunt.file.exists(filepath)) {
				grunt.log.warn('Source file "' + filepath + '" not found.');
				return false;
			} else {
				return true;
			}
		}).map(function(filepath) {
			// Read file source.
			return grunt.file.read(filepath);
		}).join(grunt.util.normalizelf(separator));
	});	
	return src;
};