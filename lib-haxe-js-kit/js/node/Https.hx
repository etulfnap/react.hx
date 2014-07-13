package js.node;

import js.node.Http;
import js.node.http.*;
  
extern class Https 
implements npm.Package.Require<"https","*"> 
{
  static function createServer(options:{key:String,cert:String},
                        listener:HttpServerReq->ServerResponse->Void):Server;
  static function request(options:HttpsReqOpt,res:HttpClientResp->Void):Void;
  static function get(options:HttpsReqOpt,res:HttpClientResp->Void):Void;
}


typedef HttpsReqOpt = { > js.node.Http.HttpReqOpt,
   var ciphers:Dynamic;
   var rejectUnauthorized:Dynamic;
}
  