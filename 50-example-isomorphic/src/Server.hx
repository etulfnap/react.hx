import comps.Home;
import comps.About;
import comps.Error404;
import comps.RenderMode;
import controller.PageController;
import js.npm.connect.Static;
import js.npm.Express;
import js.npm.express.*;
import react.React;

using StringTools;

class Server  
{
	function new(port:Int)
	{
		var server = new Express();
		server.use( new Static( js.Node.__dirname + "/public" ) );		
		server.get("*", defaultHandler);
		server.listen( port );
	}
	
	function defaultHandler( req : Request , res : Response )
	{
		var url = req.path;
		var indexHtml = '<!doctype html>' + Indexpage.getHtml(req.originalUrl);
		res.send(indexHtml);
	}
	
	public function render() return @dom 'dummyx';
	
	static function main()
	{
		new Server(2000);
		trace('Server running on port 2000');
	}	
}

class Indexpage extends React
{
	static public function getHtml(url:String) 
	{
		var content =  React.renderComponentToString(PageController.getReactDOM(url));
	
		return '			
			<html>
			<head>
				<title>Isomorphic Demo</title>
				<link rel="stylesheet" type="text/css" href="/style.css" />
			</head>
			<body>
				<p>This React/PushState demo shows the use of isomorphism - using the same React code both on the server and the client. 
				<br />Please note that a 2 seconds delay is used before ANY client side changes are invoked. This makes it easier  to observer the serverside and clientside rendering. Make sure to open the browser console for info about what\'s going on</p>
				<ul>
					<li><a href="/" rel="pushstate">home</a></li>
					<li><a href="/about" rel="pushstate">about</a></li>
					<li><a href="/about" >about (not pushstate)</a></li>
					<li><a href="/x/y/z" rel="pushstate">non-existing page (404)</a></li>					
				</ul>
				<hr />
				<div id="content">
					$content
				</div>
			</body>
			<script src="/react.js" type="text/javascript"></script>
			<script src="/client.js" type="text/javascript"></script>
			</html>						
		'
		.replace('\t', '');
	}
	
	
	// This render() method is only needed because this class extends React. 
	// When figured out how to invoke JSX trnasformation directly, this won't be needed...
	public function render() return @dom 'dummy';
}

