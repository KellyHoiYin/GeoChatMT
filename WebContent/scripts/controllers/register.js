app.controller('RegisterCtrl', [
	'$scope','$location','$firebaseAuth', 
	function($scope,$location,$firebaseAuth) {
	
	var auth = $firebaseAuth();
		
    $scope.register = function() {
    	if (!$scope.regForm.$invalid) {
    		var email = $scope.user.email;
            var password = $scope.user.password;
            if (email && password) {
                auth.$createUserWithEmailAndPassword(email, password)
                    .then(function() {
                    	$location.path('/main');
                    }, function(error) {
                    	$scope.regError = true;
                    	$scope.regErrorMessage = error.message;
                    });
            }
        }
    };
}]);