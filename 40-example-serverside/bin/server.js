(function () { "use strict";
var React = require("react");
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var Server = function() { };
Server.main = function() {
	var server = (Http__0||require("http")).createServer(function(req,res) {
		var url = req.url;
		var content = Content.getContentHtmlFromJSX(url);
		var html = "\n\t\t\t<!doctype html>\n\t\t\t<html>\n\t\t\t\t<head>\n\t\t\t\t</head>\n\t\t\t\t<body>\n\t\t\t\t\t<ul>\n\t\t\t\t\t\t<li><a href=\"/\">Home</a></li>\n\t\t\t\t\t\t<li><a href=\"/foo\">Another page 1</a></li>\n\t\t\t\t\t\t<li><a href=\"/bar/buzz\">Another page 2</a></li>\n\t\t\t\t\t</ul>\n\t\t\t\t\t<hr />\n\t\t\t\t\t" + content + "\n\t\t\t\t</body>\n\t\t\t</html>\n\t\t\t";
		res.end(html);
	});
	server.listen(2000);
	console.log("Server running on port 2000");
};
var Content = function() { };
Content.getContentHtmlFromJSX = function(url) {
	var content;
	switch(url) {
	case "/":case "/home":case "/index":
		content = /** @jsx React.DOM */ React.DOM.div(null,  " ", React.DOM.h1(null, "Home page"), " " );
		break;
	default:
		content = /** @jsx React.DOM */ React.DOM.div(null,  " ", React.DOM.h1(null, "Another page"), " ", UrlDisplay( {url:url} ), " " );
	}
	return React.renderComponentToString(content);
};
Content.create = function(arg) {
	return Content(arg);
};
Content.__super__ = React;
Content.prototype = $extend(React.prototype,{
	render: function() {
		return /** @jsx React.DOM */ dummy;
	}
});
var UrlDisplay = function() { };
UrlDisplay.create = function(arg) {
	return UrlDisplay(arg);
};
UrlDisplay.__super__ = React;
UrlDisplay.prototype = $extend(React.prototype,{
	render: function() {
		return /** @jsx React.DOM */ React.DOM.p(null,  " Current url: ", React.DOM.strong(null, this.props.url), " " );
	}
});
Content = 				
					React.createClass((function() {
						var statics = {};
						for(var field in Content)
							statics[field] = Content[field];
						var c = new Content;
						for(var field in Content.prototype) {
							c[field] = Content.prototype[field];
						}
						c.statics = statics;
						return c;
					})());
UrlDisplay = 				
					React.createClass((function() {
						var statics = {};
						for(var field in UrlDisplay)
							statics[field] = UrlDisplay[field];
						var c = new UrlDisplay;
						for(var field in UrlDisplay.prototype) {
							c[field] = UrlDisplay.prototype[field];
						}
						c.statics = statics;
						return c;
					})());
var Crypto__7 = require("crypto");
var EventEmitter__1 = require("events").EventEmitter;
var Http__0 = require("http");
var Net__10 = require("net");
var Url__8 = require("url");
var Agent__2 = require("http").Agent;
var ClientRequest__3 = require("http").ClientRequest;
var Server__6 = require("http").Server;
var Writable__4 = require("stream").Writable;
var ServerResponse__5 = require("http").ServerResponse;
var Server__11 = require("net").Server;
var Socket__9 = require("net").Socket;
Server.main();
})();
