(function () { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var CommentBox = function() { };
CommentBox.__name__ = true;
CommentBox.main = function() {
	React.renderComponent(/** @jsx React.DOM */ CommentBox( {url:"comments.json", pollInterval:2000} ),window.document.getElementById("content"));
};
CommentBox.create = function(arg) {
	return CommentBox(arg);
};
CommentBox.__super__ = React;
CommentBox.prototype = $extend(React.prototype,{
	getInitialState: function() {
		return { data : []};
	}
	,loadCommentsFromServer: function() {
		var _g = this;
		var http = new haxe_Http(this.props.url);
		http.onData = function(data) {
			_g.setState({ data : JSON.parse(data)});
		};
		http.request();
	}
	,componentWillMount: function() {
		this.loadCommentsFromServer();
	}
	,handleCommentSubmit: function(comment) {
		var comments = this.state.data;
		var newComments = comments.concat([comment]);
		this.setState({ data : newComments});
		var http = new haxe_Http(this.props.url);
		http.request(true);
	}
	,render: function() {
		return /** @jsx React.DOM */ React.DOM.div( {className:"commentBox"},          "         ",         React.DOM.h1(null, "Comments"),         "         ",         CommentList( {data:this.state.data} ),         "         ",         CommentForm(           {onCommentSubmit:this.handleCommentSubmit}         ),       "       "       );
	}
	,__class__: CommentBox
});
var CommentList = function() { };
CommentList.__name__ = true;
CommentList.create = function(arg) {
	return CommentList(arg);
};
CommentList.__super__ = React;
CommentList.prototype = $extend(React.prototype,{
	render: function() {
		var commentNodes = this.props.data.map(function(comment) {
			return /** @jsx React.DOM */ Comment( {author:comment.author}, comment.text);
		});
		return /** @jsx React.DOM */ React.DOM.div( {className:"commentList"},          "         ",         commentNodes,       "       "       );
	}
	,__class__: CommentList
});
var CommentForm = function() { };
CommentForm.__name__ = true;
CommentForm.create = function(arg) {
	return CommentForm(arg);
};
CommentForm.__super__ = React;
CommentForm.prototype = $extend(React.prototype,{
	handleSubmit: function() {
		var author = this.refs.author.getDOMNode().value.trim();
		var text = this.refs.text.getDOMNode().value.trim();
		if(!text || !author) return false;
		this.props.onCommentSubmit({ author : author, text : text});
		this.refs.author.getDOMNode().value = "";
		this.refs.text.getDOMNode().value = "";
		return false;
	}
	,render: function() {
		return /** @jsx React.DOM */ React.DOM.form( {className:"commentForm", onSubmit:this.handleSubmit},          "         ",         React.DOM.input( {type:"text", placeholder:"Your name", ref:"author"} ),         "         ",         React.DOM.input( {type:"text", placeholder:"Say something...", ref:"text"}),         "         ",         React.DOM.input( {type:"submit", value:"Post"} ),       "       "       );
	}
	,__class__: CommentForm
});
var Comment = function() { };
Comment.__name__ = true;
Comment.create = function(arg) {
	return Comment(arg);
};
Comment.__super__ = React;
Comment.prototype = $extend(React.prototype,{
	render: function() {
		var html = Markdown.markdownToHtml(this.props.children.toString());
		return /** @jsx React.DOM */ React.DOM.div( {className:"comment"},          "         ",         React.DOM.h2( {className:"commentAuthor"},            "           ",           this.props.author,         "         "         ),         "         ",         React.DOM.span( {dangerouslySetInnerHTML:{__html: html}} ),       "       "       );
	}
	,__class__: Comment
});
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
EReg.__name__ = true;
EReg.prototype = {
	match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) return this.r.m[n]; else throw "EReg::matched";
	}
	,matchedPos: function() {
		if(this.r.m == null) throw "No string matched";
		return { pos : this.r.m.index, len : this.r.m[0].length};
	}
	,replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,__class__: EReg
};
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var Lambda = function() { };
Lambda.__name__ = true;
Lambda.exists = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) return true;
	}
	return false;
};
var List = function() {
	this.length = 0;
};
List.__name__ = true;
List.prototype = {
	iterator: function() {
		return { h : this.h, hasNext : function() {
			return this.h != null;
		}, next : function() {
			if(this.h == null) return null;
			var x = this.h[0];
			this.h = this.h[1];
			return x;
		}};
	}
	,__class__: List
};
var IMap = function() { };
IMap.__name__ = true;
var Markdown = function() { };
Markdown.__name__ = true;
Markdown.markdownToHtml = function(markdown) {
	var document = new Document();
	try {
		var lines = new EReg("\n\r","g").replace(markdown,"\n").split("\n");
		document.parseRefLinks(lines);
		var blocks = document.parseLines(lines);
		return Markdown.renderHtml(blocks);
	} catch( e ) {
		return "<pre>" + Std.string(e) + "</pre>";
	}
};
Markdown.renderHtml = function(blocks) {
	return new markdown_HtmlRenderer().render(blocks);
};
var Document = function() {
	this.refLinks = new haxe_ds_StringMap();
	this.inlineSyntaxes = [];
};
Document.__name__ = true;
Document.prototype = {
	parseRefLinks: function(lines) {
		var indent = "^[ ]{0,3}";
		var id = "\\[([^\\]]+)\\]";
		var quote = "\"[^\"]+\"";
		var apos = "'[^']+'";
		var paren = "\\([^)]+\\)";
		var link = new EReg("" + indent + id + ":\\s+(\\S+)\\s*(" + quote + "|" + apos + "|" + paren + "|)\\s*$","");
		var _g1 = 0;
		var _g = lines.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(!link.match(lines[i])) continue;
			var id1 = link.matched(1);
			var url = link.matched(2);
			var title = link.matched(3);
			if(title == "") title = null; else title = title.substring(1,title.length - 1);
			id1 = id1.toLowerCase();
			var value = new Link(id1,url,title);
			this.refLinks.set(id1,value);
			lines[i] = "";
		}
	}
	,parseLines: function(lines) {
		var parser = new markdown_BlockParser(lines,this);
		var blocks = [];
		while(!(parser.pos >= parser.lines.length)) {
			var _g = 0;
			var _g1 = markdown_BlockSyntax.get_syntaxes();
			while(_g < _g1.length) {
				var syntax = _g1[_g];
				++_g;
				if(syntax.canParse(parser)) {
					var block = syntax.parse(parser);
					if(block != null) blocks.push(block);
					break;
				}
			}
		}
		return blocks;
	}
	,parseInline: function(text) {
		return new markdown_InlineParser(text,this).parse();
	}
	,__class__: Document
};
var Link = function(id,url,title) {
	this.id = id;
	this.url = url;
	this.title = title;
};
Link.__name__ = true;
Link.prototype = {
	__class__: Link
};
var Reflect = function() { };
Reflect.__name__ = true;
Reflect.compare = function(a,b) {
	if(a == b) return 0; else if(a > b) return 1; else return -1;
};
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
var StringBuf = function() {
	this.b = "";
};
StringBuf.__name__ = true;
StringBuf.prototype = {
	add: function(x) {
		this.b += Std.string(x);
	}
	,__class__: StringBuf
};
var StringTools = function() { };
StringTools.__name__ = true;
StringTools.htmlEscape = function(s,quotes) {
	s = s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
	if(quotes) return s.split("\"").join("&quot;").split("'").join("&#039;"); else return s;
};
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && HxOverrides.substr(s,0,start.length) == start;
};
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	return slen >= elen && HxOverrides.substr(s,slen - elen,elen) == end;
};
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return c > 8 && c < 14 || c == 32;
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return HxOverrides.substr(s,r,l - r); else return s;
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return HxOverrides.substr(s,0,l - r); else return s;
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
var haxe_Http = function(url) {
	this.url = url;
	this.headers = new List();
	this.params = new List();
	this.async = true;
};
haxe_Http.__name__ = true;
haxe_Http.prototype = {
	request: function(post) {
		var me = this;
		me.responseData = null;
		var r = this.req = js_Browser.createXMLHttpRequest();
		var onreadystatechange = function(_) {
			if(r.readyState != 4) return;
			var s;
			try {
				s = r.status;
			} catch( e ) {
				s = null;
			}
			if(s == undefined) s = null;
			if(s != null) me.onStatus(s);
			if(s != null && s >= 200 && s < 400) {
				me.req = null;
				me.onData(me.responseData = r.responseText);
			} else if(s == null) {
				me.req = null;
				me.onError("Failed to connect or resolve host");
			} else switch(s) {
			case 12029:
				me.req = null;
				me.onError("Failed to connect to host");
				break;
			case 12007:
				me.req = null;
				me.onError("Unknown host");
				break;
			default:
				me.req = null;
				me.responseData = r.responseText;
				me.onError("Http Error #" + r.status);
			}
		};
		if(this.async) r.onreadystatechange = onreadystatechange;
		var uri = this.postData;
		if(uri != null) post = true; else {
			var $it0 = this.params.iterator();
			while( $it0.hasNext() ) {
				var p = $it0.next();
				if(uri == null) uri = ""; else uri += "&";
				uri += encodeURIComponent(p.param) + "=" + encodeURIComponent(p.value);
			}
		}
		try {
			if(post) r.open("POST",this.url,this.async); else if(uri != null) {
				var question = this.url.split("?").length <= 1;
				r.open("GET",this.url + (question?"?":"&") + uri,this.async);
				uri = null;
			} else r.open("GET",this.url,this.async);
		} catch( e1 ) {
			me.req = null;
			this.onError(e1.toString());
			return;
		}
		if(!Lambda.exists(this.headers,function(h) {
			return h.header == "Content-Type";
		}) && post && this.postData == null) r.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		var $it1 = this.headers.iterator();
		while( $it1.hasNext() ) {
			var h1 = $it1.next();
			r.setRequestHeader(h1.header,h1.value);
		}
		r.send(uri);
		if(!this.async) onreadystatechange(null);
	}
	,onData: function(data) {
	}
	,onError: function(msg) {
	}
	,onStatus: function(status) {
	}
	,__class__: haxe_Http
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
haxe_ds_StringMap.__name__ = true;
haxe_ds_StringMap.__interfaces__ = [IMap];
haxe_ds_StringMap.prototype = {
	set: function(key,value) {
		this.h["$" + key] = value;
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,__class__: haxe_ds_StringMap
};
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else return o.__class__;
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js_Boot.__string_rec(o[i],s); else str += js_Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) str2 += ", \n";
		str2 += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
var js_Browser = function() { };
js_Browser.__name__ = true;
js_Browser.createXMLHttpRequest = function() {
	if(typeof XMLHttpRequest != "undefined") return new XMLHttpRequest();
	if(typeof ActiveXObject != "undefined") return new ActiveXObject("Microsoft.XMLHTTP");
	throw "Unable to create XMLHttpRequest object.";
};
var markdown_Node = function() { };
markdown_Node.__name__ = true;
markdown_Node.prototype = {
	__class__: markdown_Node
};
var markdown_NodeVisitor = function() { };
markdown_NodeVisitor.__name__ = true;
markdown_NodeVisitor.prototype = {
	__class__: markdown_NodeVisitor
};
var markdown_ElementNode = function(tag,children) {
	this.tag = tag;
	this.children = children;
	this.attributes = new haxe_ds_StringMap();
};
markdown_ElementNode.__name__ = true;
markdown_ElementNode.__interfaces__ = [markdown_Node];
markdown_ElementNode.empty = function(tag) {
	return new markdown_ElementNode(tag,null);
};
markdown_ElementNode.withTag = function(tag) {
	return new markdown_ElementNode(tag,[]);
};
markdown_ElementNode.text = function(tag,text) {
	return new markdown_ElementNode(tag,[new markdown_TextNode(text)]);
};
markdown_ElementNode.prototype = {
	isEmpty: function() {
		return this.children == null;
	}
	,accept: function(visitor) {
		if(visitor.visitElementBefore(this)) {
			var _g = 0;
			var _g1 = this.children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				child.accept(visitor);
			}
			visitor.visitElementAfter(this);
		}
	}
	,__class__: markdown_ElementNode
};
var markdown_TextNode = function(text) {
	this.text = text;
};
markdown_TextNode.__name__ = true;
markdown_TextNode.__interfaces__ = [markdown_Node];
markdown_TextNode.prototype = {
	accept: function(visitor) {
		visitor.visitText(this);
	}
	,__class__: markdown_TextNode
};
var markdown_BlockParser = function(lines,document) {
	this.lines = lines;
	this.document = document;
	this.pos = 0;
};
markdown_BlockParser.__name__ = true;
markdown_BlockParser.prototype = {
	get_current: function() {
		return this.lines[this.pos];
	}
	,get_next: function() {
		if(this.pos >= this.lines.length - 1) return null;
		return this.lines[this.pos + 1];
	}
	,advance: function() {
		this.pos++;
	}
	,get_isDone: function() {
		return this.pos >= this.lines.length;
	}
	,matches: function(ereg) {
		if(this.pos >= this.lines.length) return false;
		return ereg.match(this.lines[this.pos]);
	}
	,matchesNext: function(ereg) {
		if(this.get_next() == null) return false;
		return ereg.match(this.get_next());
	}
	,__class__: markdown_BlockParser
};
var markdown_BlockSyntax = function() {
};
markdown_BlockSyntax.__name__ = true;
markdown_BlockSyntax.get_syntaxes = function() {
	if(markdown_BlockSyntax.syntaxes == null) markdown_BlockSyntax.syntaxes = [new markdown_EmptyBlockSyntax(),new markdown_BlockHtmlSyntax(),new markdown_SetextHeaderSyntax(),new markdown_HeaderSyntax(),new markdown_CodeBlockSyntax(),new markdown_GitHubCodeBlockSyntax(),new markdown_BlockquoteSyntax(),new markdown_HorizontalRuleSyntax(),new markdown_UnorderedListSyntax(),new markdown_OrderedListSyntax(),new markdown_ParagraphSyntax()];
	return markdown_BlockSyntax.syntaxes;
};
markdown_BlockSyntax.isAtBlockEnd = function(parser) {
	if(parser.pos >= parser.lines.length) return true;
	var _g = 0;
	var _g1 = markdown_BlockSyntax.get_syntaxes();
	while(_g < _g1.length) {
		var syntax = _g1[_g];
		++_g;
		if(syntax.canParse(parser) && syntax.get_canEndBlock()) return true;
	}
	return false;
};
markdown_BlockSyntax.prototype = {
	get_pattern: function() {
		return null;
	}
	,get_canEndBlock: function() {
		return true;
	}
	,canParse: function(parser) {
		return this.get_pattern().match(parser.lines[parser.pos]);
	}
	,parse: function(parser) {
		return null;
	}
	,parseChildLines: function(parser) {
		var childLines = [];
		while(!(parser.pos >= parser.lines.length)) {
			if(!this.get_pattern().match(parser.lines[parser.pos])) break;
			childLines.push(this.get_pattern().matched(1));
			parser.advance();
		}
		return childLines;
	}
	,__class__: markdown_BlockSyntax
};
var markdown_EmptyBlockSyntax = function() {
	markdown_BlockSyntax.call(this);
};
markdown_EmptyBlockSyntax.__name__ = true;
markdown_EmptyBlockSyntax.__super__ = markdown_BlockSyntax;
markdown_EmptyBlockSyntax.prototype = $extend(markdown_BlockSyntax.prototype,{
	get_pattern: function() {
		return markdown_BlockSyntax.RE_EMPTY;
	}
	,parse: function(parser) {
		parser.advance();
		return null;
	}
	,__class__: markdown_EmptyBlockSyntax
});
var markdown_SetextHeaderSyntax = function() {
	markdown_BlockSyntax.call(this);
};
markdown_SetextHeaderSyntax.__name__ = true;
markdown_SetextHeaderSyntax.__super__ = markdown_BlockSyntax;
markdown_SetextHeaderSyntax.prototype = $extend(markdown_BlockSyntax.prototype,{
	canParse: function(parser) {
		return parser.matchesNext(markdown_BlockSyntax.RE_SETEXT);
	}
	,parse: function(parser) {
		var re = markdown_BlockSyntax.RE_SETEXT;
		re.match(parser.get_next());
		var tag;
		if(re.matched(1).charAt(0) == "=") tag = "h1"; else tag = "h2";
		var contents = parser.document.parseInline(parser.lines[parser.pos]);
		parser.advance();
		parser.advance();
		return new markdown_ElementNode(tag,contents);
	}
	,__class__: markdown_SetextHeaderSyntax
});
var markdown_HeaderSyntax = function() {
	markdown_BlockSyntax.call(this);
};
markdown_HeaderSyntax.__name__ = true;
markdown_HeaderSyntax.__super__ = markdown_BlockSyntax;
markdown_HeaderSyntax.prototype = $extend(markdown_BlockSyntax.prototype,{
	get_pattern: function() {
		return markdown_BlockSyntax.RE_HEADER;
	}
	,parse: function(parser) {
		this.get_pattern().match(parser.lines[parser.pos]);
		parser.advance();
		var level = this.get_pattern().matched(1).length;
		var contents = parser.document.parseInline(StringTools.trim(this.get_pattern().matched(2)));
		return new markdown_ElementNode("h" + level,contents);
	}
	,__class__: markdown_HeaderSyntax
});
var markdown_BlockquoteSyntax = function() {
	markdown_BlockSyntax.call(this);
};
markdown_BlockquoteSyntax.__name__ = true;
markdown_BlockquoteSyntax.__super__ = markdown_BlockSyntax;
markdown_BlockquoteSyntax.prototype = $extend(markdown_BlockSyntax.prototype,{
	get_pattern: function() {
		return markdown_BlockSyntax.RE_BLOCKQUOTE;
	}
	,parse: function(parser) {
		var childLines = this.parseChildLines(parser);
		var children = parser.document.parseLines(childLines);
		return new markdown_ElementNode("blockquote",children);
	}
	,__class__: markdown_BlockquoteSyntax
});
var markdown_CodeBlockSyntax = function() {
	markdown_BlockSyntax.call(this);
};
markdown_CodeBlockSyntax.__name__ = true;
markdown_CodeBlockSyntax.__super__ = markdown_BlockSyntax;
markdown_CodeBlockSyntax.prototype = $extend(markdown_BlockSyntax.prototype,{
	get_pattern: function() {
		return markdown_BlockSyntax.RE_INDENT;
	}
	,parseChildLines: function(parser) {
		var childLines = [];
		while(!(parser.pos >= parser.lines.length)) if(this.get_pattern().match(parser.lines[parser.pos])) {
			childLines.push(this.get_pattern().matched(1));
			parser.advance();
		} else {
			var nextMatch;
			if(parser.get_next() != null) nextMatch = this.get_pattern().match(parser.get_next()); else nextMatch = false;
			if(StringTools.trim(parser.lines[parser.pos]) == "" && nextMatch) {
				childLines.push("");
				childLines.push(this.get_pattern().matched(1));
				parser.advance();
				parser.advance();
			} else break;
		}
		return childLines;
	}
	,parse: function(parser) {
		var childLines = this.parseChildLines(parser);
		childLines.push("");
		var escaped = StringTools.htmlEscape(childLines.join("\n"));
		return new markdown_ElementNode("pre",[markdown_ElementNode.text("code",escaped)]);
	}
	,__class__: markdown_CodeBlockSyntax
});
var markdown_GitHubCodeBlockSyntax = function() {
	markdown_BlockSyntax.call(this);
};
markdown_GitHubCodeBlockSyntax.__name__ = true;
markdown_GitHubCodeBlockSyntax.__super__ = markdown_BlockSyntax;
markdown_GitHubCodeBlockSyntax.prototype = $extend(markdown_BlockSyntax.prototype,{
	get_pattern: function() {
		return markdown_BlockSyntax.RE_CODE;
	}
	,parseChildLines: function(parser) {
		var childLines = [];
		parser.advance();
		while(!(parser.pos >= parser.lines.length)) if(!this.get_pattern().match(parser.lines[parser.pos])) {
			childLines.push(parser.lines[parser.pos]);
			parser.advance();
		} else {
			parser.advance();
			break;
		}
		return childLines;
	}
	,parse: function(parser) {
		var syntax = this.get_pattern().matched(1);
		var childLines = this.parseChildLines(parser);
		return new markdown_ElementNode("pre",[markdown_ElementNode.text("code",StringTools.htmlEscape(childLines.join("\n")))]);
	}
	,__class__: markdown_GitHubCodeBlockSyntax
});
var markdown_HorizontalRuleSyntax = function() {
	markdown_BlockSyntax.call(this);
};
markdown_HorizontalRuleSyntax.__name__ = true;
markdown_HorizontalRuleSyntax.__super__ = markdown_BlockSyntax;
markdown_HorizontalRuleSyntax.prototype = $extend(markdown_BlockSyntax.prototype,{
	get_pattern: function() {
		return markdown_BlockSyntax.RE_HR;
	}
	,parse: function(parser) {
		parser.advance();
		return markdown_ElementNode.empty("hr");
	}
	,__class__: markdown_HorizontalRuleSyntax
});
var markdown_BlockHtmlSyntax = function() {
	markdown_BlockSyntax.call(this);
};
markdown_BlockHtmlSyntax.__name__ = true;
markdown_BlockHtmlSyntax.__super__ = markdown_BlockSyntax;
markdown_BlockHtmlSyntax.prototype = $extend(markdown_BlockSyntax.prototype,{
	get_pattern: function() {
		return markdown_BlockSyntax.RE_HTML;
	}
	,get_canEndBlock: function() {
		return false;
	}
	,parse: function(parser) {
		var childLines = [];
		while(!(parser.pos >= parser.lines.length) && !parser.matches(markdown_BlockSyntax.RE_EMPTY)) {
			childLines.push(parser.lines[parser.pos]);
			parser.advance();
		}
		return new markdown_TextNode(childLines.join("\n"));
	}
	,__class__: markdown_BlockHtmlSyntax
});
var markdown_ListItem = function(lines) {
	this.forceBlock = false;
	this.lines = lines;
};
markdown_ListItem.__name__ = true;
markdown_ListItem.prototype = {
	__class__: markdown_ListItem
};
var markdown_ParagraphSyntax = function() {
	markdown_BlockSyntax.call(this);
};
markdown_ParagraphSyntax.__name__ = true;
markdown_ParagraphSyntax.__super__ = markdown_BlockSyntax;
markdown_ParagraphSyntax.prototype = $extend(markdown_BlockSyntax.prototype,{
	get_canEndBlock: function() {
		return false;
	}
	,canParse: function(parser) {
		return true;
	}
	,parse: function(parser) {
		var childLines = [];
		while(!markdown_BlockSyntax.isAtBlockEnd(parser)) {
			childLines.push(parser.lines[parser.pos]);
			parser.advance();
		}
		var contents = parser.document.parseInline(childLines.join("\n"));
		return new markdown_ElementNode("p",contents);
	}
	,__class__: markdown_ParagraphSyntax
});
var markdown_ListSyntax = function(listTag) {
	markdown_BlockSyntax.call(this);
	this.listTag = listTag;
};
markdown_ListSyntax.__name__ = true;
markdown_ListSyntax.__super__ = markdown_BlockSyntax;
markdown_ListSyntax.prototype = $extend(markdown_BlockSyntax.prototype,{
	get_canEndBlock: function() {
		return false;
	}
	,parse: function(parser) {
		var items = [];
		var childLines = [];
		var endItem = function() {
			if(childLines.length > 0) {
				items.push(new markdown_ListItem(childLines));
				childLines = [];
			}
		};
		var match;
		var tryMatch = function(pattern) {
			match = pattern;
			return pattern.match(parser.lines[parser.pos]);
		};
		var afterEmpty = false;
		while(!(parser.pos >= parser.lines.length)) {
			if(tryMatch(markdown_BlockSyntax.RE_EMPTY)) childLines.push(""); else if(tryMatch(markdown_BlockSyntax.RE_UL) || tryMatch(markdown_BlockSyntax.RE_OL)) {
				endItem();
				childLines.push(match.matched(1));
			} else if(tryMatch(markdown_BlockSyntax.RE_INDENT)) childLines.push(match.matched(1)); else if(markdown_BlockSyntax.isAtBlockEnd(parser)) break; else {
				if(childLines.length > 0 && childLines[childLines.length - 1] == "") break;
				childLines.push(parser.lines[parser.pos]);
			}
			parser.advance();
		}
		endItem();
		var _g1 = 0;
		var _g = items.length;
		while(_g1 < _g) {
			var i = _g1++;
			var len = items[i].lines.length;
			var _g3 = 1;
			var _g2 = len + 1;
			while(_g3 < _g2) {
				var jj = _g3++;
				var j = len - jj;
				if(markdown_BlockSyntax.RE_EMPTY.match(items[i].lines[j])) {
					if(i < items.length - 1) {
						items[i].forceBlock = true;
						items[i + 1].forceBlock = true;
					}
					items[i].lines.pop();
				} else break;
			}
		}
		var itemNodes = [];
		var _g4 = 0;
		while(_g4 < items.length) {
			var item = items[_g4];
			++_g4;
			var blockItem = item.forceBlock || item.lines.length > 1;
			var blocksInList = [markdown_BlockSyntax.RE_BLOCKQUOTE,markdown_BlockSyntax.RE_HEADER,markdown_BlockSyntax.RE_HR,markdown_BlockSyntax.RE_INDENT,markdown_BlockSyntax.RE_UL,markdown_BlockSyntax.RE_OL];
			if(!blockItem) {
				var _g11 = 0;
				while(_g11 < blocksInList.length) {
					var pattern1 = blocksInList[_g11];
					++_g11;
					if(pattern1.match(item.lines[0])) {
						blockItem = true;
						break;
					}
				}
			}
			if(blockItem) {
				var children = parser.document.parseLines(item.lines);
				itemNodes.push(new markdown_ElementNode("li",children));
			} else {
				var contents = parser.document.parseInline(item.lines[0]);
				itemNodes.push(new markdown_ElementNode("li",contents));
			}
		}
		return new markdown_ElementNode(this.listTag,itemNodes);
	}
	,__class__: markdown_ListSyntax
});
var markdown_UnorderedListSyntax = function() {
	markdown_ListSyntax.call(this,"ul");
};
markdown_UnorderedListSyntax.__name__ = true;
markdown_UnorderedListSyntax.__super__ = markdown_ListSyntax;
markdown_UnorderedListSyntax.prototype = $extend(markdown_ListSyntax.prototype,{
	get_pattern: function() {
		return markdown_BlockSyntax.RE_UL;
	}
	,__class__: markdown_UnorderedListSyntax
});
var markdown_OrderedListSyntax = function() {
	markdown_ListSyntax.call(this,"ol");
};
markdown_OrderedListSyntax.__name__ = true;
markdown_OrderedListSyntax.__super__ = markdown_ListSyntax;
markdown_OrderedListSyntax.prototype = $extend(markdown_ListSyntax.prototype,{
	get_pattern: function() {
		return markdown_BlockSyntax.RE_OL;
	}
	,__class__: markdown_OrderedListSyntax
});
var markdown_HtmlRenderer = function() {
};
markdown_HtmlRenderer.__name__ = true;
markdown_HtmlRenderer.__interfaces__ = [markdown_NodeVisitor];
markdown_HtmlRenderer.prototype = {
	render: function(nodes) {
		this.buffer = new StringBuf();
		var _g = 0;
		while(_g < nodes.length) {
			var node = nodes[_g];
			++_g;
			node.accept(this);
		}
		return this.buffer.b;
	}
	,visitText: function(text) {
		if(text.text == null) this.buffer.b += "null"; else this.buffer.b += "" + text.text;
	}
	,visitElementBefore: function(element) {
		if(this.buffer.b != "" && markdown_HtmlRenderer.BLOCK_TAGS.match(element.tag)) this.buffer.b += "\n";
		this.buffer.b += Std.string("<" + element.tag);
		var attributeNames;
		var _g = [];
		var $it0 = element.attributes.keys();
		while( $it0.hasNext() ) {
			var k = $it0.next();
			_g.push(k);
		}
		attributeNames = _g;
		attributeNames.sort(Reflect.compare);
		var _g1 = 0;
		while(_g1 < attributeNames.length) {
			var name = attributeNames[_g1];
			++_g1;
			this.buffer.add(" " + name + "=\"" + element.attributes.get(name) + "\"");
		}
		if(element.children == null) {
			this.buffer.b += " />";
			return false;
		} else {
			this.buffer.b += ">";
			return true;
		}
	}
	,visitElementAfter: function(element) {
		this.buffer.b += Std.string("</" + element.tag + ">");
	}
	,__class__: markdown_HtmlRenderer
};
var markdown_InlineSyntax = function(pattern) {
	this.pattern = new EReg(pattern,"m");
};
markdown_InlineSyntax.__name__ = true;
markdown_InlineSyntax.prototype = {
	tryMatch: function(parser) {
		if(this.pattern.match(parser.get_currentSource()) && this.pattern.matchedPos().pos == 0) {
			parser.writeText();
			if(this.onMatch(parser)) parser.consume(this.pattern.matched(0).length);
			return true;
		}
		return false;
	}
	,onMatch: function(parser) {
		return false;
	}
	,__class__: markdown_InlineSyntax
};
var markdown_TextSyntax = function(pattern,substitute) {
	markdown_InlineSyntax.call(this,pattern);
	this.substitute = substitute;
};
markdown_TextSyntax.__name__ = true;
markdown_TextSyntax.__super__ = markdown_InlineSyntax;
markdown_TextSyntax.prototype = $extend(markdown_InlineSyntax.prototype,{
	onMatch: function(parser) {
		if(this.substitute == null) {
			parser.advanceBy(this.pattern.matched(0).length);
			return false;
		}
		parser.addNode(new markdown_TextNode(this.substitute));
		return true;
	}
	,__class__: markdown_TextSyntax
});
var markdown_AutolinkSyntax = function() {
	markdown_InlineSyntax.call(this,"<((http|https|ftp)://[^>]*)>");
};
markdown_AutolinkSyntax.__name__ = true;
markdown_AutolinkSyntax.__super__ = markdown_InlineSyntax;
markdown_AutolinkSyntax.prototype = $extend(markdown_InlineSyntax.prototype,{
	onMatch: function(parser) {
		var url = this.pattern.matched(1);
		var anchor = markdown_ElementNode.text("a",StringTools.htmlEscape(url));
		anchor.attributes.set("href",url);
		parser.addNode(anchor);
		return true;
	}
	,__class__: markdown_AutolinkSyntax
});
var markdown_TagSyntax = function(pattern,tag,end) {
	markdown_InlineSyntax.call(this,pattern);
	this.tag = tag;
	this.endPattern = new EReg(end == null?pattern:end,"m");
};
markdown_TagSyntax.__name__ = true;
markdown_TagSyntax.__super__ = markdown_InlineSyntax;
markdown_TagSyntax.prototype = $extend(markdown_InlineSyntax.prototype,{
	onMatch: function(parser) {
		parser.stack.push(new markdown_TagState(parser.pos,parser.pos + this.pattern.matched(0).length,this));
		return true;
	}
	,onMatchEnd: function(parser,state) {
		parser.addNode(new markdown_ElementNode(this.tag,state.children));
		return true;
	}
	,__class__: markdown_TagSyntax
});
var markdown_LinkSyntax = function(linkResolver) {
	markdown_TagSyntax.call(this,"\\[",null,markdown_LinkSyntax.linkPattern);
	this.linkResolver = linkResolver;
};
markdown_LinkSyntax.__name__ = true;
markdown_LinkSyntax.__super__ = markdown_TagSyntax;
markdown_LinkSyntax.prototype = $extend(markdown_TagSyntax.prototype,{
	onMatchEnd: function(parser,state) {
		var url;
		var title;
		if(this.endPattern.matched(1) == null || this.endPattern.matched(1) == "") {
			if(this.linkResolver == null) return false;
			if(state.children.length != 1) return false;
			if(!js_Boot.__instanceof(state.children[0],markdown_TextNode)) return false;
			var link = state.children[0];
			var node = this.linkResolver(link.text);
			if(node == null) return false;
			parser.addNode(node);
			return true;
		}
		if(this.endPattern.matched(3) != null && this.endPattern.matched(3) != "") {
			url = this.endPattern.matched(3);
			title = this.endPattern.matched(4);
			if(StringTools.startsWith(url,"<") && StringTools.endsWith(url,">")) url = url.substring(1,url.length - 1);
		} else {
			var id = this.endPattern.matched(2);
			if(id == "") id = parser.source.substring(state.startPos + 1,parser.pos);
			id = id.toLowerCase();
			var link1 = parser.document.refLinks.get(id);
			if(link1 == null) return false;
			url = link1.url;
			title = link1.title;
		}
		var anchor = new markdown_ElementNode("a",state.children);
		var value = StringTools.htmlEscape(url);
		anchor.attributes.set("href",value);
		if(title != null && title != "") {
			var value1 = StringTools.htmlEscape(title);
			anchor.attributes.set("title",value1);
		}
		parser.addNode(anchor);
		return true;
	}
	,__class__: markdown_LinkSyntax
});
var markdown_CodeSyntax = function(pattern) {
	markdown_InlineSyntax.call(this,pattern);
};
markdown_CodeSyntax.__name__ = true;
markdown_CodeSyntax.__super__ = markdown_InlineSyntax;
markdown_CodeSyntax.prototype = $extend(markdown_InlineSyntax.prototype,{
	onMatch: function(parser) {
		parser.addNode(markdown_ElementNode.text("code",StringTools.htmlEscape(this.pattern.matched(1))));
		return true;
	}
	,__class__: markdown_CodeSyntax
});
var markdown_InlineParser = function(source,document) {
	this.start = 0;
	this.pos = 0;
	this.source = source;
	this.document = document;
	this.stack = [];
	if(document.inlineSyntaxes != null) {
		this.syntaxes = [];
		var _g = 0;
		var _g1 = document.inlineSyntaxes;
		while(_g < _g1.length) {
			var syntax = _g1[_g];
			++_g;
			this.syntaxes.push(syntax);
		}
		var _g2 = 0;
		var _g11 = markdown_InlineParser.defaultSyntaxes;
		while(_g2 < _g11.length) {
			var syntax1 = _g11[_g2];
			++_g2;
			this.syntaxes.push(syntax1);
		}
	} else this.syntaxes = markdown_InlineParser.defaultSyntaxes;
	var x = new markdown_LinkSyntax(document.linkResolver);
	this.syntaxes.splice(1,0,x);
};
markdown_InlineParser.__name__ = true;
markdown_InlineParser.prototype = {
	parse: function() {
		this.stack.push(new markdown_TagState(0,0,null));
		while(!this.get_isDone()) {
			var matched = false;
			var _g1 = 1;
			var _g = this.stack.length;
			while(_g1 < _g) {
				var i = _g1++;
				if(this.stack[this.stack.length - i].tryMatch(this)) {
					matched = true;
					break;
				}
			}
			if(matched) continue;
			var _g2 = 0;
			var _g11 = this.syntaxes;
			while(_g2 < _g11.length) {
				var syntax = _g11[_g2];
				++_g2;
				if(syntax.tryMatch(this)) {
					matched = true;
					break;
				}
			}
			if(matched) continue;
			this.advanceBy(1);
		}
		return this.stack[0].close(this);
	}
	,writeText: function() {
		this.writeTextRange(this.start,this.pos);
		this.start = this.pos;
	}
	,writeTextRange: function(start,end) {
		if(end > start) {
			var text = this.source.substring(start,end);
			var nodes = this.stack[this.stack.length - 1].children;
			if(nodes.length > 0 && js_Boot.__instanceof(nodes[nodes.length - 1],markdown_TextNode)) {
				var lastNode = nodes[nodes.length - 1];
				var newNode = new markdown_TextNode("" + lastNode.text + text);
				nodes[nodes.length - 1] = newNode;
			} else nodes.push(new markdown_TextNode(text));
		}
	}
	,addNode: function(node) {
		this.stack[this.stack.length - 1].children.push(node);
	}
	,get_currentSource: function() {
		return this.source.substring(this.pos,this.source.length);
	}
	,get_isDone: function() {
		return this.pos == this.source.length;
	}
	,advanceBy: function(length) {
		this.pos += length;
	}
	,consume: function(length) {
		this.pos += length;
		this.start = this.pos;
	}
	,__class__: markdown_InlineParser
};
var markdown_TagState = function(startPos,endPos,syntax) {
	this.startPos = startPos;
	this.endPos = endPos;
	this.syntax = syntax;
	this.children = [];
};
markdown_TagState.__name__ = true;
markdown_TagState.prototype = {
	tryMatch: function(parser) {
		if(this.syntax.endPattern.match(parser.get_currentSource()) && this.syntax.endPattern.matchedPos().pos == 0) {
			this.close(parser);
			return true;
		}
		return false;
	}
	,close: function(parser) {
		var index = HxOverrides.indexOf(parser.stack,this,0);
		var unmatchedTags = parser.stack.splice(index + 1,parser.stack.length - index);
		var _g = 0;
		while(_g < unmatchedTags.length) {
			var unmatched = unmatchedTags[_g];
			++_g;
			parser.writeTextRange(unmatched.startPos,unmatched.endPos);
			var _g1 = 0;
			var _g2 = unmatched.children;
			while(_g1 < _g2.length) {
				var child = _g2[_g1];
				++_g1;
				this.children.push(child);
			}
		}
		parser.writeText();
		parser.stack.pop();
		if(parser.stack.length == 0) return this.children;
		if(this.syntax.onMatchEnd(parser,this)) parser.consume(this.syntax.endPattern.matched(0).length); else {
			parser.start = this.startPos;
			parser.advanceBy(this.syntax.endPattern.matched(0).length);
		}
		return null;
	}
	,__class__: markdown_TagState
};
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
CommentBox = 				
					React.createClass((function() {
						var statics = {};
						for(var field in CommentBox)
							statics[field] = CommentBox[field];
						var c = new CommentBox;
						for(var field in CommentBox.prototype) {
							c[field] = CommentBox.prototype[field];
						}
						c.statics = statics;
						return c;
					})());
CommentList = 				
					React.createClass((function() {
						var statics = {};
						for(var field in CommentList)
							statics[field] = CommentList[field];
						var c = new CommentList;
						for(var field in CommentList.prototype) {
							c[field] = CommentList.prototype[field];
						}
						c.statics = statics;
						return c;
					})());
CommentForm = 				
					React.createClass((function() {
						var statics = {};
						for(var field in CommentForm)
							statics[field] = CommentForm[field];
						var c = new CommentForm;
						for(var field in CommentForm.prototype) {
							c[field] = CommentForm.prototype[field];
						}
						c.statics = statics;
						return c;
					})());
Comment = 				
					React.createClass((function() {
						var statics = {};
						for(var field in Comment)
							statics[field] = Comment[field];
						var c = new Comment;
						for(var field in Comment.prototype) {
							c[field] = Comment.prototype[field];
						}
						c.statics = statics;
						return c;
					})());
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
String.prototype.__class__ = String;
String.__name__ = true;
Array.__name__ = true;
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
markdown_BlockSyntax.RE_EMPTY = new EReg("^([ \\t]*)$","");
markdown_BlockSyntax.RE_SETEXT = new EReg("^((=+)|(-+))$","");
markdown_BlockSyntax.RE_HEADER = new EReg("^(#{1,6})(.*?)#*$","");
markdown_BlockSyntax.RE_BLOCKQUOTE = new EReg("^[ ]{0,3}>[ ]?(.*)$","");
markdown_BlockSyntax.RE_INDENT = new EReg("^(?:\t\t|\\t)(.*)$","");
markdown_BlockSyntax.RE_CODE = new EReg("^```(\\w*)$","");
markdown_BlockSyntax.RE_HR = new EReg("^[ ]{0,3}((-+[ ]{0,2}){3,}|(_+[ ]{0,2}){3,}|(\\*+[ ]{0,2}){3,})$","");
markdown_BlockSyntax.RE_HTML = new EReg("^<[ ]*\\w+[ >]","");
markdown_BlockSyntax.RE_UL = new EReg("^[ ]{0,3}[*+-][ \\t]+(.*)$","");
markdown_BlockSyntax.RE_OL = new EReg("^[ ]{0,3}\\d+\\.[ \\t]+(.*)$","");
markdown_HtmlRenderer.BLOCK_TAGS = new EReg("blockquote|h1|h2|h3|h4|h5|h6|hr|p|pre","");
markdown_LinkSyntax.linkPattern = "\\](?:(" + "\\s?\\[([^\\]]*)\\]" + "|" + "\\s?\\(([^ )]+)(?:[ ]*\"([^\"]+)\"|)\\)" + ")|)";
markdown_InlineParser.defaultSyntaxes = [new markdown_TextSyntax("\\s*[A-Za-z0-9]+"),new markdown_AutolinkSyntax(),new markdown_LinkSyntax(),new markdown_TextSyntax(" \\* "),new markdown_TextSyntax(" _ "),new markdown_TextSyntax("&[#a-zA-Z0-9]*;"),new markdown_TextSyntax("&","&amp;"),new markdown_TextSyntax("</?\\w+.*?>"),new markdown_TextSyntax("<","&lt;"),new markdown_TagSyntax("\\*\\*","strong"),new markdown_TagSyntax("__","strong"),new markdown_TagSyntax("\\*","em"),new markdown_TagSyntax("_","em"),new markdown_CodeSyntax("``\\s?((?:.|\\n)*?)\\s?``"),new markdown_CodeSyntax("`([^`]*)`")];
CommentBox.main();
})();
