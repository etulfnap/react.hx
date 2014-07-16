package ;
import react.React;

/**
 * ...
 * @author Jonas Nyström
 */
class PageController extends React
{
	// Static, because React doesn't like instance method here... Strange!
	static public function getReactDOM(url:String)
	{
		return  switch url
		{
			case '/': @dom "<comps.Home />";
			case '/about':  @dom "<comps.About />";
			case _: @dom "<comps.Error404 />";
		}
	}
	
	public function render() return @dom '<noscript />';
}