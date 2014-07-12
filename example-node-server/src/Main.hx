package ;

import js.Node; 

import react.React;
using DateTools;

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
		var date = Date.now().format('%H:%M:%S');		
		var comp = @dom '<div>This page is server-rendered at <strong>{date}</strong> using <strong>React.hx</strong></div>';
		var compstr = React.renderComponentToString(comp);		
		var server = Node.http.createServer( function( 
			req:NodeHttpServerReq, res:NodeHttpServerResp) { 
				res.setHeader("Content-Type", "text/html"); 
				res.writeHead(200); 
				res.end(compstr); 
			} 
		); 
		
		server.listen(2000, "localhost"); 
		trace( 'Server running at http://127.0.0.1:2000/' ); 
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
