(function () { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var App = function() {
	this.products = [{ category : "Sporting Goods", price : "$49.99", stocked : true, name : "Football"},{ category : "Sporting Goods", price : "$9.99", stocked : true, name : "Baseball"},{ category : "Sporting Goods", price : "$29.99", stocked : false, name : "Basketball"},{ category : "Electronics", price : "$99.99", stocked : true, name : "iPod Touch"},{ category : "Electronics", price : "$399.99", stocked : false, name : "iPhone 5"},{ category : "Electronics", price : "$199.99", stocked : true, name : "Nexus 7"}];
};
App.main = function() {
	React.renderComponent(/** @jsx React.DOM */ App(null ),window.document.body);
};
App.create = function(arg) {
	return App(arg);
};
App.__super__ = React;
App.prototype = $extend(React.prototype,{
	render: function() {
		return /** @jsx React.DOM */ React.DOM.div(null,  " ", search_FilterableProductTable(  {products:this.products}), " " );
	}
});
var HxOverrides = function() { };
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var Lambda = function() { };
Lambda.iter = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		f(x);
	}
};
var search_FilterableProductTable = function() { };
search_FilterableProductTable.create = function(arg) {
	return search_FilterableProductTable(arg);
};
search_FilterableProductTable.__super__ = React;
search_FilterableProductTable.prototype = $extend(React.prototype,{
	getInitialState: function() {
		return { filterText : "", inStockOnly : false};
	}
	,handleUserInput: function(filterText,inStockOnly) {
		this.setState({ filterText : filterText, inStockOnly : inStockOnly});
	}
	,render: function() {
		return /** @jsx React.DOM */ React.DOM.div(null,  " ", search_SearchBar(  {filterText:this.state.filterText, inStockOnly:this.state.inStockOnly, onUserInput:this.handleUserInput}     ), " ", search_ProductTable(  {products:   this.props.products,   filterText:this.state.filterText, inStockOnly:this.state.inStockOnly}     ), " " );
	}
});
var search_ProductCategoryRow = function() { };
search_ProductCategoryRow.create = function(arg) {
	return search_ProductCategoryRow(arg);
};
search_ProductCategoryRow.__super__ = React;
search_ProductCategoryRow.prototype = $extend(React.prototype,{
	render: function() {
		return /** @jsx React.DOM */ React.DOM.tr(null,  " ", React.DOM.th( {colSpan:"2"}, this.props.category), " " );
	}
});
var search_ProductRow = function() { };
search_ProductRow.create = function(arg) {
	return search_ProductRow(arg);
};
search_ProductRow.__super__ = React;
search_ProductRow.prototype = $extend(React.prototype,{
	render: function() {
		var name;
		if(this.props.product.stocked) name = this.props.product.name; else name = /** @jsx React.DOM */ React.DOM.span( {style:  { color: "red" }} , this.props.product.name);
		return /** @jsx React.DOM */ React.DOM.tr(null,  " ", React.DOM.td(null, name), " ", React.DOM.td(null, this.props.product.price), " " );
	}
});
var search_ProductTable = function() { };
search_ProductTable.create = function(arg) {
	return search_ProductTable(arg);
};
search_ProductTable.__super__ = React;
search_ProductTable.prototype = $extend(React.prototype,{
	render: function() {
		var _g = this;
		var rows = [];
		var lastCategory = null;
		var products = this.props.products;
		Lambda.iter(products,function(product) {
			if(product.name.indexOf(_g.props.filterText) == -1 || !product.stocked && _g.props.inStockOnly) return;
			if(product.category != lastCategory) rows.push(/** @jsx React.DOM */ search_ProductCategoryRow( {category:product.category, key:product.category} ));
			rows.push(/** @jsx React.DOM */ search_ProductRow( {product:product, key:product.name} ));
			lastCategory = product.category;
		});
		return /** @jsx React.DOM */ React.DOM.table(null,  " ", React.DOM.thead(null,  " ", React.DOM.tr(null,  " ", React.DOM.th(null, "Name"), " ", React.DOM.th(null, "Price"), " " ), " " ), " ", React.DOM.tbody(null, rows), " " );
	}
});
var search_SearchBar = function() { };
search_SearchBar.create = function(arg) {
	return search_SearchBar(arg);
};
search_SearchBar.__super__ = React;
search_SearchBar.prototype = $extend(React.prototype,{
	handleChange: function() {
		this.props.onUserInput(this.refs.filterTextInput.getDOMNode().value,this.refs.inStockOnlyInput.getDOMNode().checked);
	}
	,render: function() {
		return /** @jsx React.DOM */ React.DOM.form(null,  " ", React.DOM.input(  {type:  "text",  placeholder:"Search...",  value:this.props.filterText, ref:"filterTextInput", onChange:this.handleChange}     ),  "  ",  React.DOM.p(null,  " ", React.DOM.input(  {type:  "checkbox",  checked:this.props.inStockOnly, ref:"inStockOnlyInput", onChange:this.handleChange}         ), " Only show products in stock " ), " " );
	}
});
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
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
search_FilterableProductTable = 				
					React.createClass((function() {
						var statics = {};
						for(var field in search_FilterableProductTable)
							statics[field] = search_FilterableProductTable[field];
						var c = new search_FilterableProductTable;
						for(var field in search_FilterableProductTable.prototype) {
							c[field] = search_FilterableProductTable.prototype[field];
						}
						c.statics = statics;
						return c;
					})());
search_ProductCategoryRow = 				
					React.createClass((function() {
						var statics = {};
						for(var field in search_ProductCategoryRow)
							statics[field] = search_ProductCategoryRow[field];
						var c = new search_ProductCategoryRow;
						for(var field in search_ProductCategoryRow.prototype) {
							c[field] = search_ProductCategoryRow.prototype[field];
						}
						c.statics = statics;
						return c;
					})());
search_ProductRow = 				
					React.createClass((function() {
						var statics = {};
						for(var field in search_ProductRow)
							statics[field] = search_ProductRow[field];
						var c = new search_ProductRow;
						for(var field in search_ProductRow.prototype) {
							c[field] = search_ProductRow.prototype[field];
						}
						c.statics = statics;
						return c;
					})());
search_ProductTable = 				
					React.createClass((function() {
						var statics = {};
						for(var field in search_ProductTable)
							statics[field] = search_ProductTable[field];
						var c = new search_ProductTable;
						for(var field in search_ProductTable.prototype) {
							c[field] = search_ProductTable.prototype[field];
						}
						c.statics = statics;
						return c;
					})());
search_SearchBar = 				
					React.createClass((function() {
						var statics = {};
						for(var field in search_SearchBar)
							statics[field] = search_SearchBar[field];
						var c = new search_SearchBar;
						for(var field in search_SearchBar.prototype) {
							c[field] = search_SearchBar.prototype[field];
						}
						c.statics = statics;
						return c;
					})());
App.main();
})();
