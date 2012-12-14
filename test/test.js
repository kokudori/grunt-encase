var grunt = require('grunt'),
	path = require('path'),
	fs = require('fs');

grunt.loadTasks('tasks');

exports.encase = {
	'encase src/src.js -> dest/browser.js exports hoge variable': function (test) {
		test.expect(1);

		var file = grunt.file.read(path.join('test', 'src', 'src.js')),
			dest = grunt.file.read(path.join('test', 'dest', 'browser.js'));

		var src = grunt.helper('encase', file, {
			enviroment: 'browser',
			exports: 'hoge'
		});

		test.strictEqual(dest, src);

		test.done();
	},
	'encase src/src.js -> dest/node.js exports hoge variable': function (test) {
		test.expect(1);

		var file = grunt.file.read(path.join('test', 'src', 'src.js')),
			dest = grunt.file.read(path.join('test', 'dest', 'node.js'));

		var src = grunt.helper('encase', file, {
			enviroment: 'node',
			exports: 'hoge'
		});

		test.strictEqual(dest, src);

		test.done();
	},
	'encase src/src.js -> dest/multiexport-browser.js exports hoge, piyo, foo variable': function (test) {
		test.expect(1);

		var file = grunt.file.read(path.join('test', 'src', 'src.js')),
			dest = grunt.file.read(path.join('test', 'dest', 'multiexport-browser.js'));

		var src = grunt.helper('encase', file, {
			enviroment: 'browser',
			exports: ['hoge', 'piyo', 'foo']
		});

		test.strictEqual(dest, src);

		test.done();
	},
	'encase src/src.js -> dest/multiexport-node.js exports hoge, piyo, foo variable': function (test) {
		test.expect(1);

		var file = grunt.file.read(path.join('test', 'src', 'src.js')),
			dest = grunt.file.read(path.join('test', 'dest', 'multiexport-node.js'));

		var src = grunt.helper('encase', file, {
			enviroment: 'node',
			exports: ['hoge', 'piyo', 'foo']
		});

		test.strictEqual(dest, src);

		test.done();
	}
};