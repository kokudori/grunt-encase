'use strict';

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
    
    			// -- CONCAT
			    // Iterate over all specified file groups.
			    this.files.forEach(function(f) {
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
		
				// -- ENCASOR
				src = (function(content, options, grunt) {
						
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
					})(src, options, grunt);

				grunt.file.write(this.data.dest, src);
				if (this.errorCount) { return false; }
				grunt.log.writeln('File "' + this.data.dest + '" created.');
	});
};