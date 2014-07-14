package ;
import haxe.Timer;
import js.Lib;
import pushstate.PushState;
import react.React;
import js.Browser;
import comps.Home;
import comps.About;
import comps.Error404;
import comps.RenderMode;
import controller.PageController;

/**
 * ...
 * @author Jonas Nyström
 */
class Client extends React
{
	static var stateChangeCount = 0;	
	static var timer:Timer = null; 
	static var prevUrl:String = null;
	
	static function main() 
	{		
		trace('Server rendered page');	
		
		
		PushState.init();			
		PushState.addEventListener(function (url) 
		{		
			var pagemode = (++stateChangeCount > 1)? "client" : "server";
			trace('(PushState notified about url activatity. Mode: $pagemode Url: $url)');
			
			if (prevUrl != null) if (prevUrl == url) return;
			prevUrl = url;
			
			trace('(Wait 2 seconds until client acts, just to make it possible to observer what\'s going on...)');
			
			if (timer != null) timer.stop();		
			timer = Timer.delay(function() {
				trace('Client rendering - the virtual dom should prevent any reloading of unchanged dom elements. url: $url');
				React.renderComponent(			
					PageController.getReactDOM(url),
					 js.Browser.document.getElementById('content')
				);				 
			}, 2000);					
		});	
		
		
	}	
	
	public function render() return @dom 'dummy';

}