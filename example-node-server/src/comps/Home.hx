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
		return @dom '<div><p>Welcome home! Rendering mode: <comps.RenderMode /></p><img src="/image.png" /></div>'; 
	}		
}