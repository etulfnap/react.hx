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
			
			React.renderComponent(
				@dom '<App />',
				 js.Browser.document.body
			);						
		});
	}
	//----------------------------------------------------------------
	
	public function render() 
	{
		var page = switch PushState.currentPath
		{
			case "/hello": @dom '<PageHello />';
			case "/hello/": @dom '<PageHello />';
			case "/": @dom '<PageHome />';
			default: @dom '<Page404 />';
		}
		
		return @dom '
			<div>
				<ul>
					<li><a href="/" rel="pushstate">/home</a></li>				
					<li><a href="/hello" rel="pushstate">/hello</a></li>
					<li><a href="/hello" >/hello (non pushstate link)</a></li>
					<li><a href="/xyz" rel="pushstate">/(non-existing page)</a></li>
				</ul>
				<hr />
				{page}
			</div>
		';
	}	
}

class PageHome extends React
{	
	public function render() 
	{
		return @dom '	
			<div>
				<h3>
					Home
				</h3>
			</div>
		';
	}
}

class Page404 extends React
{	
	public function render() 
	{
		return @dom '	
			<div>
				<h3>
					404
				</h3>
			</div>
		';
	}
}

class PageHello extends React
{	
	public function render() 
	{
		return @dom '	
			<div>
				<h3>
					Hello!
				</h3>
			</div>
		';
	}
}
