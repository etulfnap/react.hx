(function () { "use strict";
var AddRequire = function() { };
AddRequire.main = function() {
	var arg0 = Sys.args()[2];
	var filename;
	if(arg0 != null) filename = arg0; else filename = "bin/server.js";
	if(!js.Node.require("fs").existsSync(filename)) {
		console.log("File " + filename + " doesn't exist");
		Sys.exit(0);
	}
	var content = sys.io.File.getContent(filename);
	var lines = content.split("\n");
	lines.splice(1,0,"var React = require(\"react\");");
	sys.io.File.saveContent(filename,lines.join("\n"));
};
var HxOverrides = function() { };
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
var Std = function() { };
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
var Sys = function() { };
Sys.args = function() {
	return js.Node.process.argv;
};
Sys.exit = function(code) {
	js.Node.process.exit(code);
};
var haxe = {};
haxe.io = {};
haxe.io.Eof = function() { };
haxe.io.Eof.prototype = {
	toString: function() {
		return "Eof";
	}
};
var js = {};
js.Node = function() { };
var sys = {};
sys.io = {};
sys.io.File = function() { };
sys.io.File.getContent = function(path) {
	return js.Node.require("fs").readFileSync(path,sys.io.File.UTF8_ENCODING);
};
sys.io.File.saveContent = function(path,content) {
	js.Node.require("fs").writeFileSync(path,content);
};
if(Array.prototype.map == null) Array.prototype.map = function(f) {
	var a = [];
	var _g1 = 0;
	var _g = this.length;
	while(_g1 < _g) {
		var i = _g1++;
		a[i] = f(this[i]);
	}
	return a;
};
js.Node.setTimeout = setTimeout;
js.Node.clearTimeout = clearTimeout;
js.Node.setInterval = setInterval;
js.Node.clearInterval = clearInterval;
js.Node.global = global;
js.Node.process = process;
js.Node.require = require;
js.Node.console = console;
js.Node.module = module;
js.Node.stringify = JSON.stringify;
js.Node.parse = JSON.parse;
var version = HxOverrides.substr(js.Node.process.version,1,null).split(".").map(Std.parseInt);
if(version[0] > 0 || version[1] >= 9) {
	js.Node.setImmediate = setImmediate;
	js.Node.clearImmediate = clearImmediate;
}
sys.io.File.UTF8_ENCODING = { encoding : "utf8"};
AddRequire.main();
})();
