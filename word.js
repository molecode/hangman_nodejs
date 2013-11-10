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

var getEncryptedWord = function ( word ) {
	return "_".repeat( word.length );
}

var getSolution = function ( entry, character ) {
	var word = entry['word'];
	var solution = entry['solution'];
	var indices = [];
	for( var i=0; i<word.length; i++ ) {
 		if ( word[i] === character.toUpperCase() ) indices.push(i);
	}
	for( var i in indices ){
		solution = solution.replaceAt( indices[i], character.toUpperCase() ); 
	}
	if( solution.indexOf( "_" ) === -1 ){
		solution = solution + "   ----   HOORAY!"
	}
	entry['solution'] = solution;
}

module.exports.getEncryptedWord = getEncryptedWord;
module.exports.getSolution = getSolution;