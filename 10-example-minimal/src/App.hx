package ;

import react.React;

class App extends React
{	
	static function main() 
	{
		// Here, the @dom metadata will invoke the React jsx magic, that will
		// transform the xml into valid React javascript directives.
		// The greeter attribute will be passed into the Greeting class as a React props parameter .
		// Finally, the resulting Greeting  component will be injected in the js.Browser.document.body element:
		React.renderComponent(
			@dom '
				<div>
					<Greeting greeter="world" />
				</div>	
				',
			 js.Browser.document.body
		);
		// Above, we apply the rendered elements to the body (js.Browser.document.body),
		// but we could apply it to any DOM element by using something like js.Browser.document.getElementById('content')
		
	}
	
	//----------------------------------------------------------------
	// This render() method is only needed because this class extends React to get hold of the @dom transformation magic.
	// When figured out how to invoke JSX trnasformation directly, this won't be needed...
	public function render() return @dom 'dummy';
}

class Greeting extends React
{
	public function render() 
	{
		return @dom '
			<p>
				Hello, <i>{this.props.greeter}!</i>
			</p>
		';
	}		
}

