'use strict';

var grunt = require('grunt'),
	encasor = require('../tasks/encasor');

exports.encase = {
	'encase src/src.js -> dest/browser.js exports hoge variable': function (test) {
		test.expect(1);

		var file = grunt.file.read('test/src/src.js'),
			dest = grunt.file.read('test/dest/browser.js');

		var src = encasor.encase(file, {
			enviroment: 'browser',
			useStrict: true,
			exports: 'hoge'
		});

		test.strictEqual(dest, src);

		test.done();
	},
	'encase src/src.js -> dest/node.js exports hoge variable': function (test) {
		test.expect(1);

		var file = grunt.file.read('test/src/src.js'),
			dest = grunt.file.read('test/dest/node.js');

		var src = encasor.encase(file, {
			enviroment: 'node',
			useStrict: true,
			exports: 'hoge'
		});

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
		});

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
		});

		test.strictEqual(dest, src);

		test.done();
	},
	'encase src/src.js -> dest/params-browser.js exports hoge variable, params w = window, d = document': function (test) {
		test.expect(1);

		var file = grunt.file.read('test/src/src.js'),
			dest = grunt.file.read('test/dest/params-browser.js');

		var src = encasor.encase(file, {
			enviroment: 'browser',
			useStrict: true,
			exports: ['hoge'],
			params: { 'window': 'w', 'document': 'd' }
		});

		test.strictEqual(dest, src);

		test.done();
	},
	'encase src/src.js -> dest/amd-browser.js exports none defines $ = jquery, bb = backbone': function (test) {
		test.expect(1);

		var file = grunt.file.read('test/src/src.js'),
			dest = grunt.file.read('test/dest/amd-browser.js');

		var src = encasor.encase(file, {
			enviroment: 'browser',
			useStrict: true,
			exports: [],
			defines: { 'jquery': '$', 'backbone': 'bb' }
		});

		test.strictEqual(dest, src);

		test.done();
	},
	'encase src/src.js -> dest/amd-browser-export exports hoge defines $ = jquery, bb = backbone': function (test) {
		test.expect(1);

		var file = grunt.file.read('test/src/src.js'),
			dest = grunt.file.read('test/dest/amd-browser-export.js');

		var src = encasor.encase(file, {
			enviroment: 'browser',
			useStrict: true,
			exports: 'hoge',
			defines: { 'jquery': '$', 'backbone': 'bb' }
		});

		test.strictEqual(dest, src);

		test.done();
	},
	'encase src/src.js -> dest/amd-browser-multiexport exports hoge, hoge, piyo, foo defines $ = jquery, bb = backbone': function (test) {
		test.expect(1);

		var file = grunt.file.read('test/src/src.js'),
			dest = grunt.file.read('test/dest/amd-browser-multiexport.js');

		var src = encasor.encase(file, {
			enviroment: 'browser',
			useStrict: true,
			exports: ['hoge', 'piyo', 'foo'],
			defines: { 'jquery': '$', 'backbone': 'bb' }
		});

		test.strictEqual(dest, src);

		test.done();
	},
	'encase src/src.js -> dest/amd-browser.js exports none defines $ = jquery, bb = backbone with banner': function (test) {
		test.expect(1);

		var file = grunt.file.read('test/src/src.js'),
			dest = grunt.file.read('test/dest/amd-browser-with-banner.js');

		var src = encasor.encase(file, {
			enviroment: 'browser',
			banner: '/* amd-browser-test */',
			exports: [],
			defines: { 'jquery': '$', 'backbone': 'bb' }
		});

		test.strictEqual(dest, src);

		test.done();
	}
};