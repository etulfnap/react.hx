package ;

using StringTools;
using StrTools;

class StrTools
{	
	inline static public function ltrimString(s:String, remove:String = ' ')
	{
		while (s.startsWith(remove)) s = s.substr(remove.length);
		return s;
	}
	
	inline static public function rtrimString(s:String, remove:String = ' ')
	{
		while (s.endsWith(remove)) s = s.substr(0, s.length - remove.length);
		return s;
	}
	
	inline static public function trimString(s:String, remove:String = ' ')
	{
		return s.ltrimString(remove).rtrimString(remove);
	}	
	
	inline static public function has(s:String, lookfor:String) return (s.indexOf(lookfor) > -1);
}