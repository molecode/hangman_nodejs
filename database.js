var usedChars = {};
var word = "Bordeaux".toUpperCase();
var solution = "";
var firstRun = true;

String.prototype.repeat = function( num ) {
    return new Array( num + 1 ).join( this );
};

String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}

var getWord = function ( character ) {
	if( firstRun ) {
		firstRun = false;
		solution = "_".repeat( word.length );
		return solution.split('').join(' ');
	} else{
		var indices = [];
		for( var i=0; i<word.length; i++ ) {
    		if ( word[i] === character.toUpperCase() ) indices.push(i);
		}
		if( indices.length == 0 ){
			usedChars[ character.toUpperCase() ] = true;
		}
		for( var i in indices ){
			solution = solution.replaceAt( indices[i], character.toUpperCase() ); 
		}
		if( solution.indexOf( "_" ) === -1 ){
			solution = solution + " ---- HOORAY!"
		}
		return solution.split('').join(' ');
	}
};

var reset = function () {
	delete usedChars;
	usedChars = {};
	firstRun = true;
	solution = "_".repeat( word.length );
	return solution.split('').join(' ');
}

module.exports.getWord = getWord;
module.exports.getUsedChars = usedChars;
module.exports.reset = reset;