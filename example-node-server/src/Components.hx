package ;
import haxe.Timer;
import react.React;
using DateTools;
/**
 * ...
 * @author Jonas Nyström
 */
class Components
{ }


class Content extends React
{
	public function render() 
	{
		return @dom '<div>Rendering mode: <RenderMode /></div>'; 
	}		
}

class RenderMode extends React
{
	var count = 0;
	override public function getInitialState() 
	{
		#if (!nodejs) 
			new Timer(1000).run = function() { this.setState( { rendermode: 'Client ' + this.count++ } ); };		
		#end	
		
		return {rendermode: 'Server' };
	}
	
	public function render()
	{
		return @dom '
			<strong>{this.state.rendermode}</strong>
		';		
	}
}
