import react.React;

class Server {
	
	static function main(){
		
		var server = js.node.Http.createServer(function(req,res){
			var url = req.url;
			
			var content = Content.getContentHtmlFromJSX(url);			
			
			var html = '
			<!doctype html>
			<html>
				<head>
				</head>
				<body>
					<ul>
						<li><a href="/">Home</a></li>
						<li><a href="/foo">Page 1</a></li>
						<li><a href="/bar/buzz">Page 2</a></li>
					</ul>
					<hr />
					$content
				</body>
			</html>
			';
			
			res.end(html);
		});

		server.listen(2000);
		trace('Server running on port 2000');		
	}
	
}

class Content extends React
{
	
	// This must be a static method, otherwise React will complain on runtime...
	static public function getContentHtmlFromJSX(url:String)
	{
		var content = switch url {			
			
			case '/' | '/home' | '/index' : @dom '
				<div>
					<Home />
				</div>';
			
			case _: @dom '
				<div>
					<Another  />
					<UrlDisplay url={url} />
				</div>
				';
		}
		
		return React.renderComponentToString(content);
	}

	// This render() method is only needed because this class extends React. 
	// When figured out how to invoke JSX trnasformation directly, this won't be needed...
	public function render() return @dom 'dummy';
}

class Home extends React
{
	public function render() return @dom '
		<h1>Home page</h1>
	';
}

class Another extends React
{
	public function render() return @dom '
		<h1>Another page</h1>
	';	
}

class UrlDisplay extends React
{
	public function render() 
	{
		return @dom '
			<p>
				Current url: <strong>{this.props.url}</strong>
			</p>
		';
	}
}