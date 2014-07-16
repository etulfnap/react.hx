# Example wikisearch

No runnable example!
WORK IN PROGRESS!


## Compiling and running the demo

### 1. Install nmp dependencies

Run the `1-npm-install-dependencies.sh` script in a ssh enabled commandline tool. (On windows you can try Git-bash.)

### 2. Compile the Haxe project into bin/demo.js

Run the `2-compile.sh` script from the commandline to compile the haxe project.

Pleaase note that the bin/demo.js file is patched after build using `node add-require.js`!

### 3. Run the bin/index.html in your browser

Run the `3-run-express-server.sh` to start the neko server in the bin/ directory. 

Then you can surf to http://localhost:2000 to see the example in action.







