package react;
import haxe.macro.Context;
using StringTools;
using StrTools;
/**
 * ...
 * @author Jonas Nyström
 */

 //#if (macro)
class ReactJSX
{

	static public function createDom(code : String) 
	{
		
		
		//if (!sys.FileSystem.exists('node_modules/react-tools')) Sys.command('npm', ['install', 'react-tools']);
		code = '"/** @jsx React.DOM */ ' + code.substr(1, code.length - 2).replace('\\n', ' ').replace('\\t', '').replace(String.fromCharCode(13), '').replace('/ >', '/>').trim() + '"';
		
		
		// Hack to allow React classes in packages (1)
		var r = ~/<([ ]*)([A-Za-z0-9.]{2,})([ \/\\])/g;
		var matches = regexGetAllMatches(r, code);		
		var matchesWithPackage = matches.filter(function(s) return s.indexOf('.') != -1).map(function(s) return s.substr(1));
		var matchesWithoutPackage = matchesWithPackage.map(function(s) return s.substr(s.lastIndexOf('.')+1));
		for (i in 0...matchesWithPackage.length) code = code.replace(matchesWithPackage[i], matchesWithoutPackage[i]);
		//
		
		
		var n = 'process.stdout.write(require("react-tools").transform($code))',
		proc = new sys.io.Process('node', []);
		proc.stdin.writeString(n);
		proc.stdin.close();
		var out = proc.stdout.readAll().toString();
		var err = proc.stderr.readAll().toString();
		proc.close();
		if ("" != err) throw 'JSX transformation error -  the JSX xml might not be correctly formatted \n $err';
		
		
		// Hack to allow React classes in packages (2)
		for (i in 0...matchesWithPackage.length) out = out.replace(matchesWithoutPackage[i], matchesWithPackage[i]);
		//
		
		
		return out;
		
	}
	
  	static function regexGetAllMatches(r:EReg, str:String):Array<String>
	{
		var result:Array<String> = [];
		var pos = 1;
		while (true)
		{
			try {
				str = str.substr(pos);
				r.match(str);
				result.push(r.matched(0).substr(0, -1));
				pos = r.matchedPos().pos + r.matchedPos().len+1;
			} catch (e:Dynamic) {
				return result;
			}
		}
		return [];
	}	
	
	
}
//#end