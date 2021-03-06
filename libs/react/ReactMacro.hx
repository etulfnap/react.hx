package react;

import haxe.macro.Compiler;
import haxe.macro.Context;
import haxe.macro.Expr;
using tink.macro.Exprs;
using StringTools;
using Lambda;

class ReactMacro 
{
	macro static public function build():Array<Field> 
	{
		if (Compiler.getDefine('js-flatten') == null) Context.warning('The compiler directive "-D js_flatten" should be used to allow React components in subpackages \n 	Also note that all uses of subpackage classes in JSX code must be referenced with full qualified class name, including the package path.', Context.currentPos());		
		
		var fields = Context.getBuildFields();
		var cls    = Context.getLocalClass().toString();
		cls = cls.replace('.', '_');

		fields.map(function(field) {
			if(field.name == 'new') {
				switch field.kind {
					case FFun({ args: a }) if(a.length > 0):
						throw '$cls: a React class cannot have a constructor with arguments';
					case _:
				}
			}
			switch field.kind {
				case FFun(o):
				o.expr = transformDom(o.expr);
				case _:
			}
		});

		fields.push({
			name: "__init__",
			doc: null,
			meta: [],
			access: [AStatic, APublic],
			kind: FFun({
				args : [],
				expr : macro untyped $i { cls } = __js__('				
					React.createClass((function() {
						var statics = {};
						for(var field in $cls)
							statics[field] = $cls[field];
						var c = new $cls;
						for(var field in $cls.prototype) {
							c[field] = $cls.prototype[field];
						}
						c.statics = statics;
						return c;
					})())'),
				ret : macro : Void
			}),
			pos: Context.currentPos()
		});
		
		fields.push({
			name: "create",
			doc: null,
			meta: [],
			access: [AStatic, APublic, AInline],
			kind: FFun({
				args : [{type: macro : Dynamic, name : 'arg'}],
				expr : macro return untyped __js__('$cls')(arg),
				ret : macro : ReactComponent
			}),
			pos: Context.currentPos()
		});

		return fields;
	}

	static function transformDom(expr : Expr) 
	{
		return Exprs.transform(expr, function(expr) {
			return switch expr.expr {
				case EMeta(meta, e):
					if(meta.name == 'dom') {
						var code = createDom(e.toString());
						macro (untyped __js__('$code') : react.React.ReactComponent);
					} else {
						expr;
					}
				case _:
					expr;
			}
		});
	}

	static function createDom(code : String) 
	{
		// Check that node package "react-tools" is installed
		// If running serverside, node package "react" is also needed
		if (!sys.FileSystem.exists('node_modules/react-tools')) throw 'You must react-tools installed for the React JSX transformation. Run "npm install react react-tools" from an commandline with git access.';
		
		// Add the comment block that the JSX tranformation needs, and do some cleanup
		code = '"/** @jsx React.DOM */ ' + code.substr(1, code.length - 2).replace('\\n', ' ').replace('\\t', '').replace(String.fromCharCode(13), '').replace('/ >', '/>').trim() + '"';		
		
		// Rewrite subpackage dots to underlines, eg. comps.navigation.Menu to comps_navigation_Menu
		// Requires compiler directive -D js-flatten!
		var r = ~/<([ ]*)([A-Za-z0-9.]{2,})([ \/\\])/g;
		var matches = regexGetAllMatches(r, code).filter(function(s) return s.indexOf('.') != -1).map(function(s) return s.substr(1));	
		matches.iter(function(match) code =code.replace(match, match.replace('.', '_')));
		
		// Invoke the React JSX transformation
		var n = 'process.stdout.write(require("react-tools").transform($code))',
		proc = new sys.io.Process('node', []);
		proc.stdin.writeString(n);
		proc.stdin.close();
		var out = proc.stdout.readAll().toString();
		var err = proc.stderr.readAll().toString();
		proc.close();
		
		if ("" != err) throw 'JSX transformation error -  the JSX xml might not be correctly formatted \n $err';
		
		return out;
	}

  public static var domTags = "a abbr address area article aside audio b base bdi bdo big blockquote body br
button canvas caption cite code col colgroup data datalist dd del details dfn
div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6
head header hr html i iframe img input ins kbd keygen label legend li link
main map mark menu menuitem meta meter nav noscript object ol optgroup option
output p param pre progress q rp rt ruby s samp script section select small
source span strong style sub summary sup table tbody td textarea tfoot th
thead time title tr track u ul var video wbr circle defs g line linearGradient path polygon polyline radialGradient rect
stop svg text"
.replace(String.fromCharCode(13), '').split(" ");

  public static var domAttributes = "accept accessKey action allowFullScreen allowTransparency alt async
autoComplete autoFocus autoPlay cellPadding cellSpacing charSet checked
className colSpan cols content contentEditable contextMenu controls data
dateTime defer dir disabled draggable encType form formNoValidate frameBorder
height hidden href htmlFor httpEquiv icon id label lang list loop max
maxLength method min multiple name noValidate pattern placeholder poster
preload radioGroup readOnly rel required role rowSpan rows sandbox scope
scrollLeft scrollTop seamless selected size span spellCheck src srcDoc step
style tabIndex target title type value width wmode cx cy d fill fx fy gradientTransform gradientUnits offset points r rx ry
spreadMethod stopColor stopOpacity stroke strokeLinecap strokeWidth textAnchor transform
version viewBox x1 x2 x y1 y2 y"
.replace(String.fromCharCode(13), '').split(" ");
  // TODO more non standard HTML attrs here http://facebook.github.io/react/docs/special-non-dom-attributes.html
  
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

