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
var Server = function(port) {
	var server = new (Express__4||require("express"))();
	server["use"]((function($this) {
		var $r;
		var middleware = new (Static__6||require("serve-static"))(js.Node.__dirname + "/public");
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
		var indexHtml = "<!doctype html>" + Indexpage.getHtml(req.originalUrl);
		res.send(indexHtml);
	}
	,render: function() {
		return "dummyx";
	}
};
var Indexpage = function() { };
Indexpage.getHtml = function(url) {
	var content = React.renderComponentToString(controller.PageController.getReactDOM(url));
	return StringTools.replace("\t\t\t\n\t\t\t<html>\n\t\t\t<head>\n\t\t\t\t<title>React Demo</title>\n\t\t\t</head>\n\t\t\t<body>\n\t\t\t\t<ul>\n\t\t\t\t\t<li><a href=\"/\" rel=\"pushstate\">home</a></li>\n\t\t\t\t\t<li><a href=\"/about\" rel=\"pushstate\">about</a></li>\n\t\t\t\t\t<li><a href=\"/about\" >about (not pushstate)</a></li>\n\t\t\t\t\t<li><a href=\"/x/y/z\" rel=\"pushstate\">non-existing page (404)</a></li>\t\t\t\t\t\n\t\t\t\t</ul>\n\t\t\t\t<hr />\n\t\t\t\t<div id=\"content\">\n\t\t\t\t\t" + content + "\n\t\t\t\t</div>\n\t\t\t</body>\n\t\t\t<script src=\"/react.js\" type=\"text/javascript\"></script>\n\t\t\t<script src=\"/client.js\" type=\"text/javascript\"></script>\n\t\t\t</html>\t\t\t\t\t\t\n\t\t","\t","");
};
Indexpage.create = function(arg) {
	return Indexpage(arg);
};
Indexpage.__super__ = React;
Indexpage.prototype = $extend(React.prototype,{
	render: function() {
		return /** @jsx React.DOM */ dummyx;
	}
});
var StringTools = function() { };
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
var comps = {};
comps.About = function() { };
comps.About.create = function(arg) {
	return comps.About(arg);
};
comps.About.__super__ = React;
comps.About.prototype = $extend(React.prototype,{
	render: function() {
		return /** @jsx React.DOM */ React.DOM.div(null,  " ", React.DOM.h1(null, "About"), " ", React.DOM.img( {src:"/image.png"} ), " " );
	}
});
comps.Error404 = function() { };
comps.Error404.create = function(arg) {
	return comps.Error404(arg);
};
comps.Error404.__super__ = React;
comps.Error404.prototype = $extend(React.prototype,{
	render: function() {
		return /** @jsx React.DOM */ React.DOM.div(null,  " ", React.DOM.h1(null, "404"), " ", React.DOM.p(null, "this page doesn't exist!"), " " );
	}
});
comps.Home = function() { };
comps.Home.create = function(arg) {
	return comps.Home(arg);
};
comps.Home.__super__ = React;
comps.Home.prototype = $extend(React.prototype,{
	render: function() {
		return /** @jsx React.DOM */ React.DOM.div(null,  " ", React.DOM.h1(null, "Home"), " ", React.DOM.p(null, "Rendering mode: ", comps.RenderMode(null )), " ", React.DOM.img( {src:"/image.png"} ), " " );
	}
});
comps.RenderMode = function() {
	this.count = 0;
};
comps.RenderMode.create = function(arg) {
	return comps.RenderMode(arg);
};
comps.RenderMode.__super__ = React;
comps.RenderMode.prototype = $extend(React.prototype,{
	getInitialState: function() {
		return { rendermode : "Server"};
	}
	,componentDidMount: function() {
		console.log("Render mode.componentDidMount()");
	}
	,componentWillUnmount: function() {
		console.log("Render mode.componentWillUnmount()");
	}
	,render: function() {
		return /** @jsx React.DOM */ React.DOM.strong(null, this.state.rendermode);
	}
});
var controller = {};
controller.PageController = function() { };
controller.PageController.getReactDOM = function(url) {
	switch(url) {
	case "/":
		return /** @jsx React.DOM */ comps.Home(null );
	case "/about":
		return /** @jsx React.DOM */ comps.About(null );
	default:
		return /** @jsx React.DOM */ comps.Error404(null );
	}
};
controller.PageController.create = function(arg) {
	return controller.PageController(arg);
};
controller.PageController.__super__ = React;
controller.PageController.prototype = $extend(React.prototype,{
	render: function() {
		return /** @jsx React.DOM */ dummyx;
	}
});
var haxe = {};
haxe.Timer = function() { };
var js = {};
js.Node = function() { };
js.npm = {};
js.npm.connect = {};
js.npm.connect.support = {};
js.npm.connect.support._Middleware = {};
js.npm.connect.support._Middleware.TMiddleware_Impl_ = function() { };
js.npm.connect.support._Middleware.TMiddleware_Impl_.fromMiddleware = function(middleware) {
	return middleware;
};
js.npm.connect.support._Middleware.TMiddleware_Impl_.fromAsync = function(method) {
	return method;
};
js.npm.connect.support._Middleware.TMiddleware_Impl_.fromSync = function(method) {
	return method;
};
js.support = {};
js.support._RegExp = {};
js.support._RegExp.RegExp_Impl_ = function() { };
js.support._RegExp.RegExp_Impl_.fromEReg = function(r) {
	return r.r;
};
js.support._RegExp.RegExp_Impl_.toEReg = function(r) {
	return new EReg(r.source,(r.ignoreCase?"i":"") + (r.global?"g":"") + (r.multiline?"m":""));
};
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
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
comps.About = 				
					React.createClass((function() {
						var statics = {};
						for(var field in comps.About)
							statics[field] = comps.About[field];
						var c = new comps.About;
						for(var field in comps.About.prototype) {
							c[field] = comps.About.prototype[field];
						}
						c.statics = statics;
						return c;
					})());
comps.Error404 = 				
					React.createClass((function() {
						var statics = {};
						for(var field in comps.Error404)
							statics[field] = comps.Error404[field];
						var c = new comps.Error404;
						for(var field in comps.Error404.prototype) {
							c[field] = comps.Error404.prototype[field];
						}
						c.statics = statics;
						return c;
					})());
comps.Home = 				
					React.createClass((function() {
						var statics = {};
						for(var field in comps.Home)
							statics[field] = comps.Home[field];
						var c = new comps.Home;
						for(var field in comps.Home.prototype) {
							c[field] = comps.Home.prototype[field];
						}
						c.statics = statics;
						return c;
					})());
comps.RenderMode = 				
					React.createClass((function() {
						var statics = {};
						for(var field in comps.RenderMode)
							statics[field] = comps.RenderMode[field];
						var c = new comps.RenderMode;
						for(var field in comps.RenderMode.prototype) {
							c[field] = comps.RenderMode.prototype[field];
						}
						c.statics = statics;
						return c;
					})());
controller.PageController = 				
					React.createClass((function() {
						var statics = {};
						for(var field in controller.PageController)
							statics[field] = controller.PageController[field];
						var c = new controller.PageController;
						for(var field in controller.PageController.prototype) {
							c[field] = controller.PageController.prototype[field];
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
js.Node.console = console;
js.Node.process = process;
js.Node.module = module;
js.Node.exports = exports;
js.Node.__filename = __filename;
js.Node.__dirname = __dirname;
js.Node.require = require;
js.Node.setTimeout = setTimeout;
js.Node.setInterval = setInterval;
js.Node.clearTimeout = clearTimeout;
js.Node.clearInterval = clearInterval;
Server.main();
})();

//# sourceMappingURL=server.js.map