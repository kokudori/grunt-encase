(function(undefined) {
'use strict';
var hoge = 100,
	piyo = 200,
	foo = 300,
	bar = 400;
if (typeof define === 'function' && typeof define.amd === 'object') {
define(function(exports) { return hoge; });
} else {
window.hoge = hoge;
}
}).call(this);