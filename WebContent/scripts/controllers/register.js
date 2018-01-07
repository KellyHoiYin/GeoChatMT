app.controller('RegisterCtrl', [
	'$scope','$location','$firebaseAuth','CommonProp',
	function($scope,$location,$firebaseAuth,CommonProp) {
	
	var auth = $firebaseAuth();
		
    $scope.register = function() {
    	if (!$scope.regForm.$invalid) {
    		var email = $scope.user.email;
            var password = $scope.user.password;
            if (email && password) {
                auth.$createUserWithEmailAndPassword(email, password)
                    .then(function(user) {
        	        	CommonProp.setUser(user.email);
        	        	CommonProp.setUserId(user.uid);
                    	$location.path('/main');
                    }, function(error) {
                    	$scope.regError = true;
                    	$scope.regErrorMessage = error.message;
                    });
            }
        }
    };
}]);



