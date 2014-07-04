# react.hx

### example-minimal
Simplistic example with one single React component, the App class.

To start the whole thing, we use the following static main entry point. As seen, it will render a component called App, and pass a greeting property to it with the value "world":
```haxe
	static function main() 
	{
		React.renderComponent(
			@dom '<App greeter="world" />',
			 js.Browser.document.body
		);
	}
```
Note the @dom meta directive preceeding the xml block - that is what kicks of the jsx transformation from xml into valid React javascript code for building the DOM elements.

The App class itself has only one method, render(). Here, we can see how the greeting value can be reached as a property of the App class, as ```this.props.greeter```:

```haxe
package ;

import react.React;

class App extends React
{	
  ...

  public function render()
  {
    return @dom '
      <div>
        <h1>Hello {this.props.greeter}!</h1>
      </div>
      ';
  }	
}
```



### example-commentbox
Closely follows the official React tutorial: http://facebook.github.io/react/docs/tutorial.html

### example-filterproducts
Roughly follows the "Thinking in React" tutorial: http://facebook.github.io/react/docs/thinking-in-react.html


Changes from original react.hx:

- some minor fixes like cleaning jsx code from linebreaks (causing errors in some cases)
- hack to allow React classes to live in other than package root (see example-filterproducts)
- haxelib library dependecies are replaced with inclusion in /libs - to avoid problems with react.hx incompatibility with later tink_core 1.0.0-rc* versions

*node* and *nmp* need to be installed on your machine




