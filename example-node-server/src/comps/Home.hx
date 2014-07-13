package comps;

import react.React;
/**
 * ...
 * @author Jonas Nyström
 */
class Home extends React
{
	public function render() 
	{
		return @dom '
			<div>
				<h1>Home</h1>
				<p>Rendering mode: <comps.RenderMode /></p>
				<img src="/image.png" />
			</div>
			'; 
	}		
}