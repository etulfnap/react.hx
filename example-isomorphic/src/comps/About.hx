package comps;

import react.React;
/**
 * ...
 * @author Jonas Nyström
 */
class About extends React
{
	public function render() 
	{
		return @dom '
			<div>
				<h1>About</h1>				
				<img src="/image.png" />
			</div>
			'; 
	}		
}