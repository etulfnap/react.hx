(function () { "use strict";
var React = require("react");
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
var PageController = function() { };
PageController.getReactDOM = function(url) {
	switch(url) {
	case "/":
		return /** @jsx React.DOM */ comps_Home(null );
	case "/about":
		return /** @jsx React.DOM */ comps_About(null );
	default:
		return /** @jsx React.DOM */ comps_Error404(null );
	}
};
PageController.create = function(arg) {
	return PageController(arg);
};
PageController.__super__ = React;
PageController.prototype = $extend(React.prototype,{
	render: function() {
		return /** @jsx React.DOM */ React.DOM.noscript(null );
	}
});
var Server = function(port) {
	var server = new (Express__4||require("express"))();
	server["use"]((function($this) {
		var $r;
		var middleware = new (Static__6||require("serve-static"))(js_Node.__dirname + "/public");
		$r = middleware;
		return $r;
	}(this)));
	server.get("*",$bind(this,this.defaultHandler));
	server.listen(port);
};
Server.main = function() {
	new Server(2000);
	console.log("Server running on port 2000");
};
Server.prototype = {
	defaultHandler: function(req,res) {
		var url = req.path;
		var indexHtml = "<!DOCTYPE html>" + Indexpage.getHtml(req.originalUrl);
		res.send(indexHtml);
	}
};
var Indexpage = function() { };
Indexpage.getHtml = function(url) {
	var content = React.renderComponentToString(PageController.getReactDOM(url));
	return StringTools.replace("\t\t\t\n\t\t\t<html>\n\t\t\t<head>\n\t\t\t\t<title>Isomorphic Demo</title>\n\t\t\t\t<link rel=\"stylesheet\" type=\"text/css\" href=\"/style.css\" />\n\t\t\t</head>\n\t\t\t<body>\n\t\t\t\t<p>This React/PushState demo shows the use of isomorphism - using the same React code both on the server and the client. \n\t\t\t\t<br />Please note that a 2 seconds delay is used before ANY client side changes are invoked. This makes it easier  to observer the serverside and clientside rendering. Make sure to open the browser console for info about what's going on</p>\n\t\t\t\t<ul>\n\t\t\t\t\t<li><a href=\"/\" rel=\"pushstate\">home</a></li>\n\t\t\t\t\t<li><a href=\"/about\" rel=\"pushstate\">about</a></li>\n\t\t\t\t\t<li><a href=\"/about\" >about (not pushstate)</a></li>\n\t\t\t\t\t<li><a href=\"/x/y/z\" rel=\"pushstate\">non-existing page (404)</a></li>\t\t\t\t\t\n\t\t\t\t</ul>\n\t\t\t\t<hr />\n\t\t\t\t<div id=\"content\">\n\t\t\t\t\t" + content + "\n\t\t\t\t</div>\n\t\t\t\t\n\t\t\t\t<script src=\"//code.jquery.com/jquery-1.11.0.min.js\"></script>\n\t\t\t\t<script src=\"/react.js\" ></script>\t\t\t\n\t\t\t\t<script src=\"/client.js\" ></script>\t\t\t\t\n\t\t\t\t\n\t\t\t</body>\n\n\t\t\t</html>\t\t\t\t\t\t\n\t\t","\t","");
};
Indexpage.create = function(arg) {
	return Indexpage(arg);
};
Indexpage.__super__ = React;
Indexpage.prototype = $extend(React.prototype,{
	render: function() {
		return /** @jsx React.DOM */ React.DOM.noscript(null );
	}
});
var StringTools = function() { };
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
var comps_About = function() { };
comps_About.create = function(arg) {
	return comps_About(arg);
};
comps_About.__super__ = React;
comps_About.prototype = $extend(React.prototype,{
	render: function() {
		return /** @jsx React.DOM */ React.DOM.div(null,  " ", React.DOM.h1(null, "About"), " ", React.DOM.img( {src:"/image.png"} ), " " );
	}
});
var comps_Error404 = function() { };
comps_Error404.create = function(arg) {
	return comps_Error404(arg);
};
comps_Error404.__super__ = React;
comps_Error404.prototype = $extend(React.prototype,{
	render: function() {
		return /** @jsx React.DOM */ React.DOM.div(null,  " ", React.DOM.h1(null, "404"), " ", React.DOM.p(null, "this page doesn't exist!"), " " );
	}
});
var comps_Home = function() { };
comps_Home.create = function(arg) {
	return comps_Home(arg);
};
comps_Home.__super__ = React;
comps_Home.prototype = $extend(React.prototype,{
	render: function() {
		return /** @jsx React.DOM */ React.DOM.div(null,  " ", React.DOM.h1(null, "Home"), " ", React.DOM.p(null, "Rendering mode: ", comps_RenderMode(null )), " ", React.DOM.img( {src:"/image.png"} ), " " );
	}
});
var comps_RenderMode = function() {
	this.count = 0;
};
comps_RenderMode.create = function(arg) {
	return comps_RenderMode(arg);
};
comps_RenderMode.__super__ = React;
comps_RenderMode.prototype = $extend(React.prototype,{
	getInitialState: function() {
		return { rendermode : "Server"};
	}
	,componentDidMount: function() {
	}
	,componentWillUnmount: function() {
	}
	,render: function() {
		return /** @jsx React.DOM */ React.DOM.strong(null, this.state.rendermode);
	}
});
var haxe_Timer = function() { };
var js_Node = function() { };
var js_npm_connect_support__$Middleware_TMiddleware_$Impl_$ = function() { };
js_npm_connect_support__$Middleware_TMiddleware_$Impl_$.fromMiddleware = function(middleware) {
	return middleware;
};
js_npm_connect_support__$Middleware_TMiddleware_$Impl_$.fromAsync = function(method) {
	return method;
};
js_npm_connect_support__$Middleware_TMiddleware_$Impl_$.fromSync = function(method) {
	return method;
};
var js_support__$RegExp_RegExp_$Impl_$ = function() { };
js_support__$RegExp_RegExp_$Impl_$.fromEReg = function(r) {
	return r.r;
};
js_support__$RegExp_RegExp_$Impl_$.toEReg = function(r) {
	return new EReg(r.source,(r.ignoreCase?"i":"") + (r.global?"g":"") + (r.multiline?"m":""));
};
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
PageController = 				
					React.createClass((function() {
						var statics = {};
						for(var field in PageController)
							statics[field] = PageController[field];
						var c = new PageController;
						for(var field in PageController.prototype) {
							c[field] = PageController.prototype[field];
						}
						c.statics = statics;
						return c;
					})());
Indexpage = 				
					React.createClass((function() {
						var statics = {};
						for(var field in Indexpage)
							statics[field] = Indexpage[field];
						var c = new Indexpage;
						for(var field in Indexpage.prototype) {
							c[field] = Indexpage.prototype[field];
						}
						c.statics = statics;
						return c;
					})());
comps_About = 				
					React.createClass((function() {
						var statics = {};
						for(var field in comps_About)
							statics[field] = comps_About[field];
						var c = new comps_About;
						for(var field in comps_About.prototype) {
							c[field] = comps_About.prototype[field];
						}
						c.statics = statics;
						return c;
					})());
comps_Error404 = 				
					React.createClass((function() {
						var statics = {};
						for(var field in comps_Error404)
							statics[field] = comps_Error404[field];
						var c = new comps_Error404;
						for(var field in comps_Error404.prototype) {
							c[field] = comps_Error404.prototype[field];
						}
						c.statics = statics;
						return c;
					})());
comps_Home = 				
					React.createClass((function() {
						var statics = {};
						for(var field in comps_Home)
							statics[field] = comps_Home[field];
						var c = new comps_Home;
						for(var field in comps_Home.prototype) {
							c[field] = comps_Home.prototype[field];
						}
						c.statics = statics;
						return c;
					})());
comps_RenderMode = 				
					React.createClass((function() {
						var statics = {};
						for(var field in comps_RenderMode)
							statics[field] = comps_RenderMode[field];
						var c = new comps_RenderMode;
						for(var field in comps_RenderMode.prototype) {
							c[field] = comps_RenderMode.prototype[field];
						}
						c.statics = statics;
						return c;
					})());
var EventEmitter__0 = require("events").EventEmitter;
var ClientRequest__3 = require("http").ClientRequest;
var Writable__1 = require("stream").Writable;
var ServerResponse__2 = require("http").ServerResponse;
var Readable__7 = require("stream").Readable;
var Express__4 = require("express");
var Static__6 = require("serve-static");
var Router__5 = require("express").Router;
js_Node.console = console;
js_Node.process = process;
js_Node.module = module;
js_Node.exports = exports;
js_Node.__filename = __filename;
js_Node.__dirname = __dirname;
js_Node.require = require;
js_Node.setTimeout = setTimeout;
js_Node.setInterval = setInterval;
js_Node.clearTimeout = clearTimeout;
js_Node.clearInterval = clearInterval;
Server.main();
})();
