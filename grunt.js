module.exports = function (grunt) {
	grunt.initConfig({
		encase: {
			'browser-test': {
				separator: '\n',
				enviroment: 'browser',
				src: 'test/src/src.js',
				dest: 'test/dest/browser.js',
				exports: 'hoge'
			},
			'node-test': {
				separator: '\n',
				enviroment: 'node',
				src: 'test/src/src.js',
				dest: 'test/dest/node.js',
				exports: 'hoge'
			},
			'multiexport-browser-test': {
				separator: '\n',
				enviroment: 'browser',
				src: 'test/src/src.js',
				dest: 'test/dest/multiexport-browser.js',
				exports: ['hoge', 'piyo', 'foo']
			},
			'multiexport-node-test': {
				separator: '\n',
				enviroment: 'node',
				src: 'test/src/src.js',
				dest: 'test/dest/multiexport-node.js',
				exports: ['hoge', 'piyo', 'foo']
			}
		},
		test: {
			all: ['test/test.js']
		},
		lint: {
			all: ['grunt.js', 'tasks/**/*.js', 'test/**/*.js']
		},
		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				boss: true,
				eqnull: true,
				node: true,
				es5: true
			},
			globals: {}
		}
	});

	grunt.loadTasks('tasks');

	// https://github.com/gruntjs/grunt/issues/349 fixed in Grunt v0.4.
	grunt.registerTask('default', 'encase test'); // add lint (lint is fatal with UTF8 BOM)
};
