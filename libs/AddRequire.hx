package ;

import haxe.Utf8;
import js.Node;
import sys.FileSystem;
import sys.io.File;
/**
 * ...
 * @author Jonas Nyström
 */
class AddRequire
{
	static public function main() 
	{
		var arg0 = Sys.args()[2];
		var filename = (arg0 != null) ? arg0 : 'bin/server.js';				
		if (!FileSystem.exists(filename)) {
			trace('File $filename doesn\'t exist');
			Sys.exit(0);
		}
		var content = File.getContent(filename);
		var lines = content.split('\n');
		lines.insert(1, 'var React = require("react");');
		File.saveContent(filename, lines.join('\n'));		
	}	
}