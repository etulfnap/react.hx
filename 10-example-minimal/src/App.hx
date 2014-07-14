package ;

import react.React;

class App extends React
{	
	static function main() 
	{
		// Here, the @dom metadata will invoke the React jsx magic, that will
		// transform the xml into valid React javascript directives.
		// The greeter attribute will be passed into the App class as a React props parameter .
		// Finally, the resulting App component will be injected in the js.Browser.document.body element:
		React.renderComponent(
			@dom '<App greeter="world" />',
			 js.Browser.document.body
		);
	}
	
	//----------------------------------------------------------------
	public function render() 
	{
		return @dom '
			<div>
				<h1>Hello {this.props.greeter}!</h1>
			</div>
		';
	}	
}


