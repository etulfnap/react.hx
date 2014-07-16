(function () { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var Client = function() { };
Client.main = function() {
	console.log("Server rendered page");
	pushstate_PushState.init();
	pushstate_PushState.addEventListener(null,function(url) {
		var pagemode;
		if(++Client.stateChangeCount > 1) pagemode = "client"; else pagemode = "server";
		console.log("- PushState notified about url activatity. Mode: " + pagemode + " Url: " + url);
		if(Client.prevUrl != null) {
			if(Client.prevUrl == url) return;
		}
		Client.prevUrl = url;
		console.log("- Wait 2 seconds until client acts, just to make it possible to observer what's going on...");
		if(Client.timer != null) Client.timer.stop();
		Client.timer = haxe_Timer.delay(function() {
			console.log("Client rendering - the React Virtual DOM should prevent any reloading of unchanged DOM elements. url: " + url);
			React.renderComponent(PageController.getReactDOM(url),window.document.getElementById("content"));
		},2000);
	});
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
var HxOverrides = function() { };
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
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
		var _g = this;
		if(this.timer == null) this.timer = new haxe_Timer(1000);
		this.timer.run = function() {
			_g.setState({ rendermode : "Client " + ++_g.count});
		};
		this.setState({ rendermode : "Client " + this.count});
	}
	,componentWillUnmount: function() {
		if(this.timer != null) this.timer.stop();
	}
	,render: function() {
		return /** @jsx React.DOM */ React.DOM.strong(null, this.state.rendermode);
	}
});
var haxe_Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
haxe_Timer.delay = function(f,time_ms) {
	var t = new haxe_Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
};
haxe_Timer.prototype = {
	stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
};
var pushstate_PushState = function() { };
pushstate_PushState.init = function(basePath) {
	if(basePath == null) basePath = "";
	pushstate_PushState.listeners = [];
	pushstate_PushState.preventers = [];
	pushstate_PushState.history = window.history;
	pushstate_PushState.basePath = basePath;
	new $(window).ready(function() {
		pushstate_PushState.handleOnPopState(null);
		new $(window.document.body).delegate("a[rel=pushstate]","click",function(e) {
			pushstate_PushState.push($(this).attr("href"));
			e.preventDefault();
		});
		window.onpopstate = pushstate_PushState.handleOnPopState;
	});
};
pushstate_PushState.handleOnPopState = function(e) {
	var path = pushstate_PushState.stripURL(window.document.location.pathname);
	var state;
	if(e != null) state = e.state; else state = null;
	if(e != null) {
		var _g = 0;
		var _g1 = pushstate_PushState.preventers;
		while(_g < _g1.length) {
			var p = _g1[_g];
			++_g;
			if(!p(path,e.state)) {
				e.preventDefault();
				pushstate_PushState.history.replaceState(pushstate_PushState.currentState,"",pushstate_PushState.currentPath);
				return;
			}
		}
	}
	pushstate_PushState.currentPath = path;
	pushstate_PushState.currentState = state;
	pushstate_PushState.dispatch(path,state);
	return;
};
pushstate_PushState.stripURL = function(path) {
	if(HxOverrides.substr(path,0,pushstate_PushState.basePath.length) == pushstate_PushState.basePath) path = HxOverrides.substr(path,pushstate_PushState.basePath.length,null);
	return path;
};
pushstate_PushState.addEventListener = function(l,s) {
	if(l != null) pushstate_PushState.listeners.push(l); else if(s != null) {
		l = function(url,_) {
			return s(url);
		};
		pushstate_PushState.listeners.push(l);
	}
	return l;
};
pushstate_PushState.removeEventListener = function(l) {
	HxOverrides.remove(pushstate_PushState.listeners,l);
};
pushstate_PushState.clearEventListeners = function() {
	while(pushstate_PushState.listeners.length > 0) pushstate_PushState.listeners.pop();
};
pushstate_PushState.addPreventer = function(p,s) {
	if(p != null) pushstate_PushState.preventers.push(p); else if(s != null) {
		p = function(url,_) {
			return s(url);
		};
		pushstate_PushState.preventers.push(p);
	}
	return p;
};
pushstate_PushState.removePreventer = function(p) {
	HxOverrides.remove(pushstate_PushState.preventers,p);
};
pushstate_PushState.clearPreventers = function() {
	while(pushstate_PushState.preventers.length > 0) pushstate_PushState.preventers.pop();
};
pushstate_PushState.dispatch = function(url,state) {
	var _g = 0;
	var _g1 = pushstate_PushState.listeners;
	while(_g < _g1.length) {
		var l = _g1[_g];
		++_g;
		l(url,state);
	}
};
pushstate_PushState.push = function(url,state) {
	if(state == null) state = { };
	var _g = 0;
	var _g1 = pushstate_PushState.preventers;
	while(_g < _g1.length) {
		var p = _g1[_g];
		++_g;
		if(!p(url,state)) return false;
	}
	pushstate_PushState.history.pushState(state,"",url);
	pushstate_PushState.currentPath = url;
	pushstate_PushState.currentState = state;
	pushstate_PushState.dispatch(url,state);
	return true;
};
pushstate_PushState.replace = function(url,state) {
	if(state == null) state = Dynamic;
	var _g = 0;
	var _g1 = pushstate_PushState.preventers;
	while(_g < _g1.length) {
		var p = _g1[_g];
		++_g;
		if(!p(url,state)) return false;
	}
	pushstate_PushState.history.replaceState(state,"",url);
	pushstate_PushState.currentPath = url;
	pushstate_PushState.currentState = state;
	pushstate_PushState.dispatch(url,state);
	return true;
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
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
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
var Dynamic = { __name__ : ["Dynamic"]};
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
Client.stateChangeCount = 0;
Client.main();
})();
