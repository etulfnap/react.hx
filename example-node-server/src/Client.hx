package ;
import haxe.Timer;
import js.Lib;
import react.React;
import js.Browser;
import comps.Home;
import comps.About;
import comps.Error404;
import comps.RenderMode;



/**
 * ...
 * @author Jonas Nyström
 */
class Client extends React
{
	static function main() 
	{				
		trace('Server rendered page - wait some seconds for any client action...');
		
		var timer = new Timer(2000);
		timer.run = function() { 
			init();  
			timer.stop();
		}
		
		//init();
	}	
	
	static public function init()
	{		
		trace('Client takes over rendering - the virtual dom should prevent any reloading of unchanged dom elements.');
		React.renderComponent(			
			PageController.getReactDOM(Browser.window.location.pathname),
			 js.Browser.document.body
		);
	}
	
	public function render() return @dom 'dummy';

}