'use strict';

var concat = module.exports = {};

concat.concat = function (files, separator, grunt) {
	return files.map(function(file) {
		return file.src.filter(function (path) {
			if (grunt.file.exists(path))
				return true;
			grunt.log.warn('Source file "' + path + '" not found.');
			return false;
		}).map(function(path) {
			return grunt.file.read(path);
		}).join(grunt.util.normalizelf(separator));
	});
};