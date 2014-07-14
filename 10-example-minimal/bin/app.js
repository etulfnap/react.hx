(function () { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var App = function() { };
App.main = function() {
	React.renderComponent(/** @jsx React.DOM */ App( {greeter:"world"} ),window.document.body);
};
App.create = function(arg) {
	return App(arg);
};
App.__super__ = React;
App.prototype = $extend(React.prototype,{
	render: function() {
		return /** @jsx React.DOM */ React.DOM.div(null,  " ", React.DOM.p(null, "Hello ", React.DOM.strong(null, this.props.greeter),"!"), " " );
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
App.main();
})();
