(function () { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var Client = function() { };
Client.main = function() {
	console.log("Server rendered page - wait some seconds for any client action...");
	var timer = new haxe.Timer(2000);
	timer.run = function() {
		Client.init();
		timer.stop();
	};
};
Client.init = function() {
	console.log("Client takes over rendering - the virtual dom should prevent any reloading of unchanged dom elements.");
	React.renderComponent(PageController.getReactDOM(window.location.pathname),window.document.body);
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
var PageController = function() { };
PageController.getReactDOM = function(url) {
	console.log("url: " + url);
	switch(url) {
	case "/":
		return /** @jsx React.DOM */ comps.Home(null );
	case "/about":
		return /** @jsx React.DOM */ comps.About(null );
	default:
		return /** @jsx React.DOM */ comps.Error404(null );
	}
};
PageController.create = function(arg) {
	return PageController(arg);
};
PageController.__super__ = React;
PageController.prototype = $extend(React.prototype,{
	render: function() {
		return /** @jsx React.DOM */ dummyx;
	}
});
var comps = {};
comps.About = function() { };
comps.About.create = function(arg) {
	return comps.About(arg);
};
comps.About.__super__ = React;
comps.About.prototype = $extend(React.prototype,{
	render: function() {
		return /** @jsx React.DOM */ React.DOM.div(null, React.DOM.p(null, "This is the about page!"),React.DOM.img( {src:"/image.png"} ));
	}
});
comps.Error404 = function() { };
comps.Error404.create = function(arg) {
	return comps.Error404(arg);
};
comps.Error404.__super__ = React;
comps.Error404.prototype = $extend(React.prototype,{
	render: function() {
		return /** @jsx React.DOM */ React.DOM.strong(null, "404: Sorry, this page can not be found!");
	}
});
comps.Home = function() { };
comps.Home.create = function(arg) {
	return comps.Home(arg);
};
comps.Home.__super__ = React;
comps.Home.prototype = $extend(React.prototype,{
	render: function() {
		return /** @jsx React.DOM */ React.DOM.div(null, React.DOM.p(null, "Welcome home! Rendering mode: ", comps.RenderMode(null )),React.DOM.img( {src:"/image.png"} ));
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
		var _g = this;
		new haxe.Timer(1000).run = function() {
			_g.setState({ rendermode : "Client " + ++_g.count});
		};
		return { rendermode : "Client " + this.count};
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
	stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
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
Client.main();
})();

//# sourceMappingURL=client.js.map