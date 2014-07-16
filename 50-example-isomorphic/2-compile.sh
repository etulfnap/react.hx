echo
echo - This runs 'haxe build-all.hxml'
echo - It will create bin/server.js and bin/public/client.js
echo - It will also patch bin/server.js by inserting 'var Rect = require("rect")' on line 2
echo 
haxe build-all.hxml
