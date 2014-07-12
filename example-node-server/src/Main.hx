package ;

import js.Node; 

import react.React;

// var React = require('react');

class Main extends React 
{ 
	
	public function render() 
	{
		return @dom '
			<div>
				Main
			</div>
		';
	}		
	
	public static function main() 
	{ 
		var comp = @dom '<div>This page is rendered on the server using <strong>ReactJS</strong></div>';
		var compstr = React.renderComponentToString(comp);
		trace(compstr);
		
		var server = Node.http.createServer( function( 
			req:NodeHttpServerReq, res:NodeHttpServerResp) { 
				res.setHeader("Content-Type", "text/html"); 
				res.writeHead(200); 
				res.end(compstr); 
			} 
		); 
		
		server.listen(1337, "localhost"); 
		trace( 'Server running at http://127.0.0.1:1337/' ); 
	} 
}

class Comp extends React
{
	public function render() 
	{
		return @dom '
			<div>
				<h1>Hello {this.props.greeter}!</h1>
			</div>
		';
	}	
}
