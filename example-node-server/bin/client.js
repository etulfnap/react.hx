(function () { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var Client = function() { };
Client.main = function() {
	React.renderComponent(/** @jsx React.DOM */ Content(null   ),window.document.body);
};
Client.create = function(arg) {
	return Client(arg);
};
Client.__super__ = React;
Client.prototype = $extend(React.prototype,{
	render: function() {
		return /** @jsx React.DOM */ dummy;
	}
});
var Components = function() { };
var Content = function() { };
Content.create = function(arg) {
	return Content(arg);
};
Content.__super__ = React;
Content.prototype = $extend(React.prototype,{
	render: function() {
		return /** @jsx React.DOM */ React.DOM.div(null, "Rendering mode: ", RenderMode(null ));
	}
});
var RenderMode = function() {
	this.count = 0;
};
RenderMode.create = function(arg) {
	return RenderMode(arg);
};
RenderMode.__super__ = React;
RenderMode.prototype = $extend(React.prototype,{
	getInitialState: function() {
		var _g = this;
		new haxe.Timer(1000).run = function() {
			_g.setState({ rendermode : "Client " + _g.count++});
		};
		return { rendermode : "Server"};
	}
	,render: function() {
		return /** @jsx React.DOM */ React.DOM.strong(null, this.state.rendermode);
	}
});
var haxe = {};
haxe.Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
haxe.Timer.prototype = {
	run: function() {
	}
};
Client = 				
					React.createClass((function() {
						var statics = {};
						for(var field in Client)
							statics[field] = Client[field];
						var c = new Client;
						for(var field in Client.prototype) {
							c[field] = Client.prototype[field];
						}
						c.statics = statics;
						return c;
					})());
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
RenderMode = 				
					React.createClass((function() {
						var statics = {};
						for(var field in RenderMode)
							statics[field] = RenderMode[field];
						var c = new RenderMode;
						for(var field in RenderMode.prototype) {
							c[field] = RenderMode.prototype[field];
						}
						c.statics = statics;
						return c;
					})());
Client.main();
})();
