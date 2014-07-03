package ;

import react.React;

class App extends React
{	
	static function main() 
	{
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




