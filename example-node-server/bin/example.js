(function () { "use strict";var React = require("react");var $estr = function() { return js.Boot.__string_rec(this,''); };function $extend(from, fields) {	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();	for (var name in fields) proto[name] = fields[name];	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;	return proto;}var DateTools = function() { };DateTools.__name__ = true;DateTools.__format_get = function(d,e) {	switch(e) {	case "%":		return "%";	case "C":		return StringTools.lpad(Std.string(Std["int"](d.getFullYear() / 100)),"0",2);	case "d":		return StringTools.lpad(Std.string(d.getDate()),"0",2);	case "D":		return DateTools.__format(d,"%m/%d/%y");	case "e":		return Std.string(d.getDate());	case "H":case "k":		return StringTools.lpad(Std.string(d.getHours()),e == "H"?"0":" ",2);	case "I":case "l":		var hour = d.getHours() % 12;		return StringTools.lpad(Std.string(hour == 0?12:hour),e == "I"?"0":" ",2);	case "m":		return StringTools.lpad(Std.string(d.getMonth() + 1),"0",2);	case "M":		return StringTools.lpad(Std.string(d.getMinutes()),"0",2);	case "n":		return "\n";	case "p":		if(d.getHours() > 11) return "PM"; else return "AM";		break;	case "r":		return DateTools.__format(d,"%I:%M:%S %p");	case "R":		return DateTools.__format(d,"%H:%M");	case "s":		return Std.string(Std["int"](d.getTime() / 1000));	case "S":		return StringTools.lpad(Std.string(d.getSeconds()),"0",2);	case "t":		return "\t";	case "T":		return DateTools.__format(d,"%H:%M:%S");	case "u":		var t = d.getDay();		if(t == 0) return "7"; else if(t == null) return "null"; else return "" + t;		break;	case "w":		return Std.string(d.getDay());	case "y":		return StringTools.lpad(Std.string(d.getFullYear() % 100),"0",2);	case "Y":		return Std.string(d.getFullYear());	default:		throw "Date.format %" + e + "- not implemented yet.";	}};DateTools.__format = function(d,f) {	var r = new StringBuf();	var p = 0;	while(true) {		var np = f.indexOf("%",p);		if(np < 0) break;		r.addSub(f,p,np - p);		r.add(DateTools.__format_get(d,HxOverrides.substr(f,np + 1,1)));		p = np + 2;	}	r.addSub(f,p,f.length - p);	return r.b;};DateTools.format = function(d,f) {	return DateTools.__format(d,f);};var HxOverrides = function() { };HxOverrides.__name__ = true;HxOverrides.cca = function(s,index) {	var x = s.charCodeAt(index);	if(x != x) return undefined;	return x;};HxOverrides.substr = function(s,pos,len) {	if(pos != null && pos != 0 && len != null && len < 0) return "";	if(len == null) len = s.length;	if(pos < 0) {		pos = s.length + pos;		if(pos < 0) pos = 0;	} else if(len < 0) len = s.length + len - pos;	return s.substr(pos,len);};var Main = function() { };Main.__name__ = true;Main.main = function() {	var date = DateTools.format(new Date(),"%H:%M:%S");	var comp = /** @jsx React.DOM */ React.DOM.div(null, "This page is server-rendered at ", React.DOM.strong(null, date), " using ", React.DOM.strong(null, "React.hx"));	var compstr = React.renderComponentToString(comp);	var server = js.Node.require("http").createServer(function(req,res) {		res.setHeader("Content-Type","text/html");		res.writeHead(200);		res.end(compstr);	});	server.listen(2000,"localhost");	console.log("Server running at http://127.0.0.1:2000/");};Main.create = function(arg) {	return Main(arg);};Main.__super__ = React;Main.prototype = $extend(React.prototype,{	render: function() {		return /** @jsx React.DOM */ React.DOM.div(null,  " Main " );	}});var Comp = function() { };Comp.__name__ = true;Comp.create = function(arg) {	return Comp(arg);};Comp.__super__ = React;Comp.prototype = $extend(React.prototype,{	render: function() {		return /** @jsx React.DOM */ React.DOM.div(null,  " ", React.DOM.h1(null, "Hello ", this.props.greeter,"!"), " " );	}});var Std = function() { };Std.__name__ = true;Std.string = function(s) {	return js.Boot.__string_rec(s,"");};Std["int"] = function(x) {	return x | 0;};Std.parseInt = function(x) {	var v = parseInt(x,10);	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);	if(isNaN(v)) return null;	return v;};var StringBuf = function() {	this.b = "";};StringBuf.__name__ = true;StringBuf.prototype = {	add: function(x) {		this.b += Std.string(x);	}	,addSub: function(s,pos,len) {		if(len == null) this.b += HxOverrides.substr(s,pos,null); else this.b += HxOverrides.substr(s,pos,len);	}};var StringTools = function() { };StringTools.__name__ = true;StringTools.lpad = function(s,c,l) {	if(c.length <= 0) return s;	while(s.length < l) s = c + s;	return s;};var haxe = {};haxe.io = {};haxe.io.Bytes = function(length,b) {	this.length = length;	this.b = b;};haxe.io.Bytes.__name__ = true;haxe.io.Bytes.alloc = function(length) {	return new haxe.io.Bytes(length,new Buffer(length));};haxe.io.Bytes.ofString = function(s) {	var nb = new Buffer(s,"utf8");	return new haxe.io.Bytes(nb.length,nb);};haxe.io.Bytes.ofData = function(b) {	return new haxe.io.Bytes(b.length,b);};haxe.io.Bytes.prototype = {	get: function(pos) {		return this.b[pos];	}	,set: function(pos,v) {		this.b[pos] = v;	}	,blit: function(pos,src,srcpos,len) {		if(pos < 0 || srcpos < 0 || len < 0 || pos + len > this.length || srcpos + len > src.length) throw haxe.io.Error.OutsideBounds;		src.b.copy(this.b,pos,srcpos,srcpos + len);	}	,sub: function(pos,len) {		if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;		var nb = new Buffer(len);		var slice = this.b.slice(pos,pos + len);		slice.copy(nb,0,0,len);		return new haxe.io.Bytes(len,nb);	}	,compare: function(other) {		var b1 = this.b;		var b2 = other.b;		var len;		if(this.length < other.length) len = this.length; else len = other.length;		var _g = 0;		while(_g < len) {			var i = _g++;			if(b1[i] != b2[i]) return b1[i] - b2[i];		}		return this.length - other.length;	}	,readString: function(pos,len) {		if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;		var s = "";		var b = this.b;		var fcc = String.fromCharCode;		var i = pos;		var max = pos + len;		while(i < max) {			var c = b[i++];			if(c < 128) {				if(c == 0) break;				s += fcc(c);			} else if(c < 224) s += fcc((c & 63) << 6 | b[i++] & 127); else if(c < 240) {				var c2 = b[i++];				s += fcc((c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127);			} else {				var c21 = b[i++];				var c3 = b[i++];				s += fcc((c & 15) << 18 | (c21 & 127) << 12 | c3 << 6 & 127 | b[i++] & 127);			}		}		return s;	}	,toString: function() {		return this.readString(0,this.length);	}	,toHex: function() {		var s = new StringBuf();		var chars = [];		var str = "0123456789abcdef";		var _g1 = 0;		var _g = str.length;		while(_g1 < _g) {			var i = _g1++;			chars.push(HxOverrides.cca(str,i));		}		var _g11 = 0;		var _g2 = this.length;		while(_g11 < _g2) {			var i1 = _g11++;			var c = this.b[i1];			s.b += String.fromCharCode(chars[c >> 4]);			s.b += String.fromCharCode(chars[c & 15]);		}		return s.b;	}	,getData: function() {		return this.b;	}};haxe.io.Error = { __ename__ : true, __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] };haxe.io.Error.Blocked = ["Blocked",0];haxe.io.Error.Blocked.toString = $estr;haxe.io.Error.Blocked.__enum__ = haxe.io.Error;haxe.io.Error.Overflow = ["Overflow",1];haxe.io.Error.Overflow.toString = $estr;haxe.io.Error.Overflow.__enum__ = haxe.io.Error;haxe.io.Error.OutsideBounds = ["OutsideBounds",2];haxe.io.Error.OutsideBounds.toString = $estr;haxe.io.Error.OutsideBounds.__enum__ = haxe.io.Error;haxe.io.Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe.io.Error; $x.toString = $estr; return $x; };var js = {};js.Boot = function() { };js.Boot.__name__ = true;js.Boot.__string_rec = function(o,s) {	if(o == null) return "null";	if(s.length >= 5) return "<...>";	var t = typeof(o);	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";	switch(t) {	case "object":		if(o instanceof Array) {			if(o.__enum__) {				if(o.length == 2) return o[0];				var str = o[0] + "(";				s += "\t";				var _g1 = 2;				var _g = o.length;				while(_g1 < _g) {					var i = _g1++;					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);				}				return str + ")";			}			var l = o.length;			var i1;			var str1 = "[";			s += "\t";			var _g2 = 0;			while(_g2 < l) {				var i2 = _g2++;				str1 += (i2 > 0?",":"") + js.Boot.__string_rec(o[i2],s);			}			str1 += "]";			return str1;		}		var tostr;		try {			tostr = o.toString;		} catch( e ) {			return "???";		}		if(tostr != null && tostr != Object.toString) {			var s2 = o.toString();			if(s2 != "[object Object]") return s2;		}		var k = null;		var str2 = "{\n";		s += "\t";		var hasp = o.hasOwnProperty != null;		for( var k in o ) {		if(hasp && !o.hasOwnProperty(k)) {			continue;		}		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {			continue;		}		if(str2.length != 2) str2 += ", \n";		str2 += s + k + " : " + js.Boot.__string_rec(o[k],s);		}		s = s.substring(1);		str2 += "\n" + s + "}";		return str2;	case "function":		return "<function>";	case "string":		return o;	default:		return String(o);	}};js.NodeC = function() { };js.NodeC.__name__ = true;js.Node = function() { };js.Node.__name__ = true;js.Node.get_assert = function() {	return js.Node.require("assert");};js.Node.get_child_process = function() {	return js.Node.require("child_process");};js.Node.get_cluster = function() {	return js.Node.require("cluster");};js.Node.get_crypto = function() {	return js.Node.require("crypto");};js.Node.get_dgram = function() {	return js.Node.require("dgram");};js.Node.get_dns = function() {	return js.Node.require("dns");};js.Node.get_fs = function() {	return js.Node.require("fs");};js.Node.get_http = function() {	return js.Node.require("http");};js.Node.get_https = function() {	return js.Node.require("https");};js.Node.get_net = function() {	return js.Node.require("net");};js.Node.get_os = function() {	return js.Node.require("os");};js.Node.get_path = function() {	return js.Node.require("path");};js.Node.get_querystring = function() {	return js.Node.require("querystring");};js.Node.get_repl = function() {	return js.Node.require("repl");};js.Node.get_tls = function() {	return js.Node.require("tls");};js.Node.get_url = function() {	return js.Node.require("url");};js.Node.get_util = function() {	return js.Node.require("util");};js.Node.get_vm = function() {	return js.Node.require("vm");};js.Node.get_zlib = function() {	return js.Node.require("zlib");};js.Node.get___filename = function() {	return __filename;};js.Node.get___dirname = function() {	return __dirname;};js.Node.get_json = function() {	return JSON;};js.Node.newSocket = function(options) {	return new js.Node.net.Socket(options);};Main = 					React.createClass((function() {						var statics = {};						for(var field in Main)							statics[field] = Main[field];						var c = new Main;						for(var field in Main.prototype) {							c[field] = Main.prototype[field];						}						c.statics = statics;						return c;					})());Comp = 					React.createClass((function() {						var statics = {};						for(var field in Comp)							statics[field] = Comp[field];						var c = new Comp;						for(var field in Comp.prototype) {							c[field] = Comp.prototype[field];						}						c.statics = statics;						return c;					})());String.__name__ = true;Array.__name__ = true;Date.__name__ = ["Date"];if(Array.prototype.map == null) Array.prototype.map = function(f) {	var a = [];	var _g1 = 0;	var _g = this.length;	while(_g1 < _g) {		var i = _g1++;		a[i] = f(this[i]);	}	return a;};js.Node.setTimeout = setTimeout;js.Node.clearTimeout = clearTimeout;js.Node.setInterval = setInterval;js.Node.clearInterval = clearInterval;js.Node.global = global;js.Node.process = process;js.Node.require = require;js.Node.console = console;js.Node.module = module;js.Node.stringify = JSON.stringify;js.Node.parse = JSON.parse;var version = HxOverrides.substr(js.Node.process.version,1,null).split(".").map(Std.parseInt);if(version[0] > 0 || version[1] >= 9) {	js.Node.setImmediate = setImmediate;	js.Node.clearImmediate = clearImmediate;}js.NodeC.UTF8 = "utf8";js.NodeC.ASCII = "ascii";js.NodeC.BINARY = "binary";js.NodeC.BASE64 = "base64";js.NodeC.HEX = "hex";js.NodeC.EVENT_EVENTEMITTER_NEWLISTENER = "newListener";js.NodeC.EVENT_EVENTEMITTER_ERROR = "error";js.NodeC.EVENT_STREAM_DATA = "data";js.NodeC.EVENT_STREAM_END = "end";js.NodeC.EVENT_STREAM_ERROR = "error";js.NodeC.EVENT_STREAM_CLOSE = "close";js.NodeC.EVENT_STREAM_DRAIN = "drain";js.NodeC.EVENT_STREAM_CONNECT = "connect";js.NodeC.EVENT_STREAM_SECURE = "secure";js.NodeC.EVENT_STREAM_TIMEOUT = "timeout";js.NodeC.EVENT_STREAM_PIPE = "pipe";js.NodeC.EVENT_PROCESS_EXIT = "exit";js.NodeC.EVENT_PROCESS_UNCAUGHTEXCEPTION = "uncaughtException";js.NodeC.EVENT_PROCESS_SIGINT = "SIGINT";js.NodeC.EVENT_PROCESS_SIGUSR1 = "SIGUSR1";js.NodeC.EVENT_CHILDPROCESS_EXIT = "exit";js.NodeC.EVENT_HTTPSERVER_REQUEST = "request";js.NodeC.EVENT_HTTPSERVER_CONNECTION = "connection";js.NodeC.EVENT_HTTPSERVER_CLOSE = "close";js.NodeC.EVENT_HTTPSERVER_UPGRADE = "upgrade";js.NodeC.EVENT_HTTPSERVER_CLIENTERROR = "clientError";js.NodeC.EVENT_HTTPSERVERREQUEST_DATA = "data";js.NodeC.EVENT_HTTPSERVERREQUEST_END = "end";js.NodeC.EVENT_CLIENTREQUEST_RESPONSE = "response";js.NodeC.EVENT_CLIENTRESPONSE_DATA = "data";js.NodeC.EVENT_CLIENTRESPONSE_END = "end";js.NodeC.EVENT_NETSERVER_CONNECTION = "connection";js.NodeC.EVENT_NETSERVER_CLOSE = "close";js.NodeC.FILE_READ = "r";js.NodeC.FILE_READ_APPEND = "r+";js.NodeC.FILE_WRITE = "w";js.NodeC.FILE_WRITE_APPEND = "a+";js.NodeC.FILE_READWRITE = "a";js.NodeC.FILE_READWRITE_APPEND = "a+";Main.main();})();