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
			},
			'params-browser-test': {
				separator: '\n',
				enviroment: 'browser',
				src: 'test/src/src.js',
				dest: 'test/dest/params-browser.js',
				exports: ['hoge'],
				params:{"window":"w", "document":"d"}
			},
			'amd-browser-test': {
				separator: '\n',
				enviroment: 'browser',
				src: 'test/src/src.js',
				dest: 'test/dest/amd-browser.js',
				exports: [],
				defines:{"jquery":"$", "backbone":"bb"}
			}			
		},
		nodeunit: {
			tests: ['test/test.js']
		},
		jshint: {
			files: ['Gruntfile.js', 'tasks/*.js', 'test/*.js', 'test/**/*.js'],
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
			}
		}
	});

	grunt.loadTasks('tasks');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');

	grunt.registerTask('default', ['jshint', 'encase', 'nodeunit']);
};