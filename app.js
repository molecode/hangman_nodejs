
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

var word = require('./word.js');
var database = {};

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var reset = function ( s ) {
	var w = "Bordeaux".toUpperCase();
	database[s] = {};
	database[s]['word'] = w;
	database[s]['solution'] = word.getEncryptedWord( w );
	database[s]['usedChars'] = new Array();
};

app.get('/', function ( req, res) {
	var s = req.sessionID;
	if ( ! database[s] ) {
		reset( s );
	}
	res.render('index', { title: 'Hangman' });
});
app.get('/word', function (req, res) {
	var s = req.sessionID;
	if( req.query.char ) {
		var c = req.query.char.toUpperCase();
		var w = database[s]['word'];
		var u = database[s]['usedChars'];
		if ( c && w.indexOf( c ) == -1 && u.indexOf( c ) < 0 ) {
			u.push( req.query.char.toUpperCase() );
		} else {
			word.getSolution( database[s], c );
		}
	}
	console.log( database );
	res.send( database[s]['solution'].split('').join(' ') );
});
app.get('/usedChars', function (req, res) {
	res.send( database[req.sessionID]['usedChars'] );
});
app.get('/reset', function (req, res) {
	s = req.sessionID;
	reset( s );
	res.send( database[s]['solution'].split('').join(' ') );
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});