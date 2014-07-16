(function () { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var App = function() { };
App.main = function() {
	React.renderComponent(/** @jsx React.DOM */ React.DOM.div(null,  " ", Greeting( {greeter:"world"} ), " ", WikiBox(null ), " " ),window.document.body);
};
App.create = function(arg) {
	return App(arg);
};
App.__super__ = React;
App.prototype = $extend(React.prototype,{
	render: function() {
		return /** @jsx React.DOM */ React.DOM.noscript(null );
	}
});
var Greeting = function() { };
Greeting.create = function(arg) {
	return Greeting(arg);
};
Greeting.__super__ = React;
Greeting.prototype = $extend(React.prototype,{
	render: function() {
		return /** @jsx React.DOM */ React.DOM.div(null,  " ", React.DOM.p(null, "Hello ", React.DOM.strong(null, this.props.greeter),"!"), " " );
	}
});
var WikiBox = function() { };
WikiBox.create = function(arg) {
	return WikiBox(arg);
};
WikiBox.__super__ = React;
WikiBox.prototype = $extend(React.prototype,{
	render: function() {
		return /** @jsx React.DOM */ React.DOM.div( {className:"wikibox"},          "         ",         React.DOM.span(null, "Give it a try:"),         "         ",         React.DOM.input( {type:"text", placeholder:"search"}  ),        "        "        );
	}
});
App = 				
					React.createClass((function() {
						var statics = {};
						for(var field in App)
							statics[field] = App[field];
						var c = new App;
						for(var field in App.prototype) {
							c[field] = App.prototype[field];
						}
						c.statics = statics;
						return c;
					})());
Greeting = 				
					React.createClass((function() {
						var statics = {};
						for(var field in Greeting)
							statics[field] = Greeting[field];
						var c = new Greeting;
						for(var field in Greeting.prototype) {
							c[field] = Greeting.prototype[field];
						}
						c.statics = statics;
						return c;
					})());
WikiBox = 				
					React.createClass((function() {
						var statics = {};
						for(var field in WikiBox)
							statics[field] = WikiBox[field];
						var c = new WikiBox;
						for(var field in WikiBox.prototype) {
							c[field] = WikiBox.prototype[field];
						}
						c.statics = statics;
						return c;
					})());
App.main();
})();
