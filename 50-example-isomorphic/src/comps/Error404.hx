package comps;

import react.React;
/**
 * ...
 * @author Jonas Nyström
 */
class Error404 extends React
{
	public function render() 
	{
		return @dom '
			<div>
				<h1>404</h1>				
				<p>this page doesn\'t exist!</p>
			</div>
			'; 
	}		
}