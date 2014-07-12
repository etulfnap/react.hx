package test;

class ExpressTest {
	static function main(){
		var PORT = 9000;
		var app = new js.npm.Express();
		app.use( new js.npm.express.Static('.') );
		app.use( new js.npm.connect.BodyParser() );
		app.use( new js.npm.connect.Session() );
		trace('listening to $PORT');
		app.listen(PORT);
	}
}