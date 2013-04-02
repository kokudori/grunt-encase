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
				dest: 'test/dest/params-browser-test.js',
				exports: ['hoge'],
				params:{"window":"w", "document":"d"}
			},
			'amd-browser-test': {
				separator: '\n',
				enviroment: 'browser',
				src: 'test/src/*.js',
				dest: 'test/dest/amd-browser-test.js',
				exports: [],
				defines:{"jquery":"$", "backbone":"bb"}
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
	grunt.registerTask('default', ['encase']);
};