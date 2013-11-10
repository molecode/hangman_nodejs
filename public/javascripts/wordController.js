var hangmanApp = angular.module('hangmanApp', []);

hangmanApp.controller('wordController', function wordController( $scope, $http ){
	$http.get( '/word' ).success( function ( data ){
			$scope.word = data;
	});

	$http.get( '/usedChars' ).success( function ( data ){
		var s = data.join(" ");
		$scope.usedChars = s;
	});

	$scope.tryButton = function () {
		$http.get( '/word', { params: {char:$scope.try} } ).success( function ( data ) {
			$scope.word = data;
		});

		$http.get( '/usedChars' ).success( function ( data ){
			var s = data.join(" ");
			$scope.usedChars = s;
		});
	};

	$scope.resetButton = function () {
		$http.get( '/reset' ).success( function ( data ) {
			$scope.word = data;
		});

		$http.get( '/usedChars' ).success( function ( data ){
			var s = data.join(" ");
			$scope.usedChars = s;
		});
	};
});