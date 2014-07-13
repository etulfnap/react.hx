import comps.Home;
import comps.About;
import comps.Error404;
import comps.RenderMode;
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
				<title>React Demo</title>
			</head>
			<body>
				$content
			</body>
			<script src="/react.js" type="text/javascript"></script>
			<script src="/client.js" type="text/javascript"></script>
			</html>						
		'
		.replace('\t', '');
	}
	
	public function render() return @dom 'dummyx';
}

