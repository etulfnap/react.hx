package ;
import sys.io.File;

import haxe.Timer;
import js.Node; 
import sys.FileSystem;
import sys.io.File;
import react.React;
import Components;
using StringTools;
using StrTools;

class Server extends React 
{ 
	
	public static function main() 
	{ 
		var server = Node.http.createServer( function( 
		
			req:NodeHttpServerReq, res:NodeHttpServerResp) 
			{
				// Asking for a javascript file?
				var fullpath =  Node.__dirname + '/' + StrTools.ltrimString(req.url, '/').replace('\\', '/');
				if (fullpath.endsWith('.js') && FileSystem.exists(fullpath))
				{
					var content = File.getContent(fullpath);
					res.setHeader("Content-Type", "text/javascript"); 
					res.writeHead(200); 
					res.end(content); 					
				}
				
				// Anything else - here just server index page...
				else
				{
					var content = React.renderComponentToString(@dom '<Content />');
					
					var html = '
						<!doctype html>
						<html>
						<head>
							<title>React Demo</title>
						</head>
						<body>
							$content
						</body>
						< script src="/react.js" type="text/javascript"></script>
						<script src="/client.js" type="text/javascript"></script>
						</html>						
					';
					
					res.setHeader("Content-Type", "text/html"); 
					res.writeHead(200); 
					res.end(html); 
				}
			} 
		); 
		
		server.listen(2000, "localhost"); 
		trace( 'Server running at http://127.0.0.1:2000/' ); 
	} 
	
	public function render() return @dom 'dummyx';
}

/*

*/

