var hangmanApp = angular.module('hangmanApp', []);

hangmanApp.controller('wordController', function wordController( $scope, $http ){
	$http.get( '/word' ).success( function ( data ){
			$scope.word = data;
	});

	$scope.tryButton = function () {
		$http.get( '/word', { params: {char:$scope.try} } ).success( function ( data ) {
			$scope.word = data;
		});

		$http.get( '/usedChars' ).success( function ( data ){
			var s = ""
			for( var char in data ){
				s = s.concat(char).concat(" ");
			}
			$scope.usedChars = s;
		});
	};

	$scope.resetButton = function () {
		$http.get( '/reset' ).success( function ( data ) {
			$scope.word = data;
			$scope.usedChars = "";
		});
	}
});