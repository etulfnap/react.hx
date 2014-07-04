package ;

import react.React;
import pushstate.PushState;

class App extends React
{	
	static var stateChangeCount = 0;	
	static function main() 
	{
		PushState.init();		
		PushState.addEventListener(function (url) {
			stateChangeCount++;
			trace([url, Std.string(stateChangeCount)]);			
			var pagemode = (stateChangeCount > 1)? "client" : "server";
			
			React.renderComponent(
				@dom '<App pagemode={pagemode}/>',
				 js.Browser.document.getElementById('content')
			);						
		});
	}
	//----------------------------------------------------------------
	
	public function render() 
	{
		var page = switch PushState.currentPath
		{
			case "/about": @dom '<PageAbout />';
			case "/home": @dom '<PageHome />';
			case "/": @dom '<PageHome />';
			default: @dom '<Page404 />';
		}
		
		return @dom '
			<div>
				<p>Page generation mode: <PageMode pagemode={this.props.pagemode} /></p>
				<ul>
					<li><a href="/" rel="pushstate">/home</a></li>				
					<li><a href="/about" rel="pushstate">/about</a></li>
					<li><a href="/about" >/about (non pushstate link)</a></li>
					<li><a href="/x/y/z" rel="pushstate">/(non-existing page)</a></li>
				</ul>
				<hr />
				{page}
			</div>
		';
	}	
}

class PageMode extends React
{
	public function render()
	{
		return  (this.props.pagemode == 'client') ? @dom '<span className="client">Client only</span>' : @dom '<span className="server">Server roundtrip</span>' ;
	}
	
}

class PageHome extends React
{	
	public function render() 
	{
		return @dom '	
			<div>
				<h3>Home</h3>
				<p>Welcome to this home page!</p>
			</div>
		';
	}
}

class Page404 extends React
{	
	
	public function render() 
	{
		var url = PushState.currentPath;
		return @dom '	
			<div>
				<h3>
					404
				</h3>
				<p>Current path: {url}</p>
			</div>
		';
	}
}

class PageAbout extends React
{	
	public function render() 
	{
		return @dom '	
			<div>
				<h3>About</h3>
				<p>Some intresting stuff about something...</p>
			</div>
		';
	}
}
