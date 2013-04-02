var grunt = require('grunt'),
	encasor = require('../tasks/encasor');

exports.encase = {
	'encase src/src.js -> dest/browser.js exports hoge variable': function (test) {
		test.expect(1);

		var file = grunt.file.read('test/src/src.js'),
			dest = grunt.file.read('test/dest/browser.js');

		var src = encasor.encase(file, {
			enviroment: 'browser',
			exports: 'hoge'
		}, grunt);

		test.strictEqual(dest, src);

		test.done();
	},
	'encase src/src.js -> dest/node.js exports hoge variable': function (test) {
		test.expect(1);

		var file = grunt.file.read('test/src/src.js'),
			dest = grunt.file.read('test/dest/node.js');

		var src = encasor.encase(file, {
			enviroment: 'node',
			exports: 'hoge'
		}, grunt);

		test.strictEqual(dest, src);

		test.done();
	},
	'encase src/src.js -> dest/multiexport-browser.js exports hoge, piyo, foo variable': function (test) {
		test.expect(1);

		var file = grunt.file.read('test/src/src.js'),
			dest = grunt.file.read('test/dest/multiexport-browser.js');

		var src = encasor.encase(file, {
			enviroment: 'browser',
			exports: ['hoge', 'piyo', 'foo']
		}, grunt);

		test.strictEqual(dest, src);

		test.done();
	},
	'encase src/src.js -> dest/multiexport-node.js exports hoge, piyo, foo variable': function (test) {
		test.expect(1);

		var file = grunt.file.read('test/src/src.js'),
			dest = grunt.file.read('test/dest/multiexport-node.js');

		var src = encasor.encase(file, {
			enviroment: 'node',
			exports: ['hoge', 'piyo', 'foo']
		}, grunt);

		test.strictEqual(dest, src);

		test.done();
	},
	'encase src/src.js -> dest/params-browser.js exports hoge variable, params w = window, d = document': function (test) {
		test.expect(1);

		var file = grunt.file.read('test/src/src.js'),
			dest = grunt.file.read('test/dest/params-browser.js');

		var src = encasor.encase(file, {
			enviroment: 'browser',
			exports: ['hoge'],
			params: { 'window': 'w', 'document': 'd' }
		}, grunt);

		test.strictEqual(dest, src);

		test.done();
	},
	'encase src/src.js -> dest/amd-browser.js exports none defines $ = jquery, bb = backbone': function (test) {
		test.expect(1);

		var file = grunt.file.read('test/src/src.js'),
			dest = grunt.file.read('test/dest/amd-browser.js');

		var src = encasor.encase(file, {
			enviroment: 'browser',
			exports: [],
			defines: { 'jquery': '$', 'backbone': 'bb' }
		}, grunt);

		test.strictEqual(dest, src);

		test.done();
	}
};