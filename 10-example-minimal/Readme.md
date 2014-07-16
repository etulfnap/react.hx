# Example minimal

Very simple client-side project that uses ReactJS JSX transformation to convert the declarative html-like xml into valid javascript statements.

Below is the static main() that kicks it off. It renders a div element containing a React component called Greeting. Note that it passes the property greeter="world" to it:
```
	static function main() 
	{
		React.renderComponent(
			@dom '
				<div>
					<Greeting greeter="world" />
				</div>	
				',
			 js.Browser.document.body
		);
	}		

```
Also note the second argument above, js.Browser.document.body, that tell React where to render the stuff. As seen, it puts it directly into the body, but you could use any html element for this, eg js.Browser.document.getElementById('foo').

Here's the Greeting componenet. Note how the greeter property is reachable via this.props.greet:
```
class Greeting extends React
{
	public function render() 
	{
		return @dom '
			<p>Hello <strong>{this.props.greeter}</strong>!</p>				
		';
	}		
}
```

When run, it will produce the following

## Compiling and running the demo

### 1. Install nmp dependencies
From a ssh enabled commandline, run the following: `> npm install react-tools` This will install the ReactJS JSX transformation tools that are run when Haxe compiles the source code.
(As an alternative, you can run the `1-npm-install-dependencies.sh` script, it will do the same.)

### 2. Compile the Haxe project into bin/app.js
Compile the project using the following command: `> haxe build.hxml`. It will produce the file **bin/app.js**.
(As an alternative, you can run the `2-compile.sh` script, it will do the same.)

### 3. Run the bin/index.html in your browser
There no extenal loading needed, so you can run the index file directly in the browser. You should see the message "Hello **world**!"







