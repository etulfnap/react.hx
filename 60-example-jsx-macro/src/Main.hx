package ;



import react.ReactJSX;
import haxe.macro.ExprTools;



class Main 
{	
	static function main() 
	{				
		var e =  ReactJSX.createDom('<div>Hello</div>');
		
		//var str = ExprTools.toString(e);
		
		trace(e);
		//trace(str);
		

	}
}



