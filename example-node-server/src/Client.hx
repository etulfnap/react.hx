package ;
import haxe.Timer;
import js.Lib;
import react.React;
import js.Browser;
import Components;
/**
 * ...
 * @author Jonas Nyström
 */
class Client extends React
{
	static function main() 
	{
		//new Timer(2000).run = function()
		//{
		//trace('client render');
		React.renderComponent(
			@dom '<Content   />',
			 js.Browser.document.body
		);
		//}
	}		
	
	@keep public function render() return @dom 'dummy';

}