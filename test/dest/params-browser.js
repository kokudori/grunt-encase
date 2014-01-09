(function(w, d, undefined) {
'use strict';
var hoge = 100,
	piyo = 200,
	foo = 300,
	bar = 400;
if (typeof define === 'function' && typeof define.amd === 'object') {
define(function(exports) { exports.hoge = hoge; });
} else {
window.hoge = hoge;
}
}).call(this, window, document);