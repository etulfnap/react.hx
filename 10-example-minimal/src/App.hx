package ;

import react.React;

class App extends React
{	
	static function main() 
	{
		// Here, the @dom metadata will invoke the React jsx magic, that will
		// transform the xml into valid React javascript directives.
		// The greeter attribute will be passed into the Greeting component as a React props parameter .
		// Finally, the resulting Greeting  component and its surrounding div element will be injected in the js.Browser.document.body element:
		React.renderComponent(
			// perform the JSX transformation magic here:
			@dom '
				<div>
					<Greeting greeter="world" />
				</div>	
				',
				
			// Injecti the result into the the DOM element of your choice here:
			 js.Browser.document.body
		);
		// Above, we apply the rendered elements to the body (js.Browser.document.body),
		// but we could apply it to any DOM element by using something like js.Browser.document.getElementById('content')
		
	}
	
	//----------------------------------------------------------------
	// This render() method is only needed because this class extends React to get hold of the @dom transformation magic.
	// When figured out how to invoke JSX trnasformation directly, this won't be needed...
	public function render() return @dom '<noscript />';
}

class Greeting extends React
{
	public function render() 
	{
		return @dom '
			<p>Hello <strong>{this.props.greeter}</strong>!</p>				
		';
	}		
}

