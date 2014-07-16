# React.hx

![React.hx](/react-hx.png?raw=true "React.hx")

React.hx is a Haxe extern implementation of ReactJS created by Franco Ponticelli (https://github.com/fponticelli).

Core ReactJS concepts:
- **React Components** - building blocks (the V in MVC) that can be built declaratively using JSX (HTML-like XML syntax) that is transformed into Javascript. (In React.hx this is taken care of by macro magic that invokes node to perform the JSX transformation at compile time.)
- **Isomorphism** - the rendering of components and pages can be handled completely transparently on the client side (in the browser) or/and on the server (by node).
- **Virtual DOM** - all rendering is peformed in two steps: first to a Virtual DOM that is blazingly fast, then - after a diff calculation is performed - to the real DOM. Only the difference is actually rendered to the real DOM. This make React solutions highly performant.
- **Data flow** - consistent data flow with **props** for passing model data immutably from component parents to children, and component internal **state** (if needed!). Keeps the data logic clear and easy to debug.

Have a look at the ReactJS site (http://reactjs.org) for great information and tutorials!

This is a minimalistic Javascript example from the http://facebook.github.io/react/index.html page:
```
/** @jsx React.DOM */
var HelloMessage = React.createClass({
	render: function() {
		return <div>Hello {this.props.name}</div>;
	}
});

React.renderComponent(<HelloMessage name="John" />, window.document.body);
```

This is how the same looks when coded in Haxe:
```
import react.React;
class HelloMessage extends React {	
	public function render() {
		return @dom '<div>Hello {this.props.name}</div>';
	}
	static function main() {
		React.renderComponent(@dom '<HelloMessage name="John" />', js.Browser.document.body);
	}	
}
```
	
## Status: Proof of concept

Note that this is a "proof of concept" with the puprose of figuring out how to match ReactJS with the great Haxe toolset.
Don't expect any production ready code here!

## Dependencies

For these examples to work, you need the following

- Haxe 3.1.3 (http://haxe.org/download/) with Neko
- NodeJS and NPM package manager (http://nodejs.org/)	
- SSH enabled commandline tool. (On osx/linux any terminal should work, on Windows Git-bash should do it.)

### Haxe libraries

All Haxe libraries neede for the examples are included in the /libs folder, so there should be no need for haxlib installations. The following libraries are used:
- React (Franco Ponticelli, https://github.com/fponticelli/react.hx)
- Tinkerbell (tink_core, tink_macro, Juraj Kirschheim, https://github.com/haxetink)
- jQueryExtern (Andy Li, https://github.com/andyli/jQueryExternForHaxe)
- Pushstate (Jason O'Neil, https://github.com/jasononeil/hxpushstate) - sligthly modified to make use of jQuerExtern instead of js.JQuery.
- Haxe-js-kit (Clément Charmet, https://github.com/clemos/haxe-js-kit)

## Examples

Have a look in the examples folders. There you can find more information about how to compile and run.

## TODOs

Some subjects of development:
- The beauty of Haxe typing is lost in the React translation. Hopefully there is a way to handle the **props** and **state** in fully Haxe typed way.
.
