(function(undefined) {

var hoge = 100,
	piyo = 200,
	foo = 300,
	bar = 400;
if (typeof define === 'function' && typeof define.amd === 'object') {
define(function(exports) { exports.hoge = hoge;
exports.piyo = piyo;
exports.foo = foo; });
} else {
window.hoge = hoge;
window.piyo = piyo;
window.foo = foo;
}
})();