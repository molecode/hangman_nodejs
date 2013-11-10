var hangmanApp = angular.module('hangmanApp', []);

var hangman = {};
hangman[0] = "______\n    |    |\n         |\n         |\n         |\n         |\n         |\n       |---|";
hangman[1] = "______\n    |    |\n    O    |\n         |\n         |\n         |\n         |\n       |---|";
hangman[2] = "______\n    |    |\n    O    |\n    |    |\n         |\n         |\n         |\n       |---|";
hangman[3] = "______\n    |    |\n    O    |\n    |    |\n    |    |\n         |\n         |\n       |---|";
hangman[4] = "______\n    |    |\n    O    |\n   \\|    |\n    |    |\n         |\n         |\n       |---|";
hangman[5] = "______\n    |    |\n    O    |\n   \\|/   |\n    |    |\n         |\n         |\n       |---|";
hangman[6] = "______\n    |    |\n    O    |\n   \\|/   |\n    |    |\n   /     |\n         |\n       |---|";
hangman[7] = "______\n    |    |\n    O    |\n   \\|/   |\n    |    |\n   / \\   |\n         |\n       |---|";

hangmanApp.controller('wordController', function wordController( $scope, $http ){
	$http.get( '/word' ).success( function ( data ){
			$scope.word = data;
	});

	$http.get( '/usedChars' ).success( function ( data ){
		var s = data.join(" ");
		$scope.usedChars = s;
		$scope.hangman = hangman[data.length];
	});

	$scope.tryButton = function () {
		$http.get( '/word', { params: {char:$scope.try} } ).success( function ( data ) {
			$scope.word = data;
		});

		$http.get( '/usedChars' ).success( function ( data ){
			var s = data.join(" ");
			$scope.usedChars = s;
			if( data.length >= Object.keys(hangman).length ){
				$scope.hangman = hangman[Object.keys(hangman).length - 1];
			} else {
				$scope.hangman = hangman[data.length];
			}
		});
	};

	$scope.resetButton = function () {
		$http.get( '/reset' ).success( function ( data ) {
			$scope.word = data;
		});

		$http.get( '/usedChars' ).success( function ( data ){
			var s = data.join(" ");
			$scope.hangman = hangman[data.length];
			$scope.usedChars = s;
		});
	};
});