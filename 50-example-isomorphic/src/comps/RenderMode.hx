package comps;
import haxe.Timer;
import react.React;
using DateTools;
/**
 * ...
 * @author Jonas Nyström
 */
class RenderMode extends React
{
	var count = 0;
	var timer:Timer;
	override public function getInitialState() 
	{
		return {rendermode: 'Server' };
	}
	
	public function componentDidMount()
	{
		//trace('Render mode.componentDidMount()');
		#if (!nodejs) 
			if (this.timer == null) this.timer = new Timer(1000);  
			timer.run = function() { this.setState( { rendermode: 'Client ' + ++this.count } ); };			
			this.setState( { rendermode: 'Client ' + this.count } );
		#end			
	}
	
	public function componentWillUnmount()
	{
		#if (!nodejs) 
			if (this.timer != null) this.timer.stop();
		#end			
		//trace('Render mode.componentWillUnmount()');
	}
	
	public function render()
	{
		return @dom '
			<strong>{this.state.rendermode}</strong>
		';		
	}
}
