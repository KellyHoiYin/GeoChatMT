app.controller('LoginCtrl', [
	'$scope','$location','$firebaseAuth','CommonProp',
	function($scope,$location,$firebaseAuth,CommonProp) {
	var auth = $firebaseAuth();
	
	$scope.login = function(event) {
	    event.preventDefault();  // To prevent form refresh
	    var username = $scope.user.email;
	    var password = $scope.user.password;
	     
	    auth.$signInWithEmailAndPassword(username,password)
	        .then(function(user) {
	        	CommonProp.setUser(user.email);
	        	CommonProp.setUserId(user.uid);
	        	$location.path('/main');
	        }, function(error) {
            	$scope.loginError = true;
            	$scope.loginErrorMessage = error.message;
	        });
	}
	

}]);

// service to allow passing variable between controllers
app.service('CommonProp', ['$location','$firebaseAuth',function($location,$firebaseAuth) {
    var user = '';
    var auth = $firebaseAuth();
    var id = '';
 
    return {
        getUser: function() {
            return user;
        },
        setUser: function(value) {
            user = value;
        },
        getUserId: function() {
            return id;
        },
        setUserId: function(value) {
            id = value;
        },
        logoutUser:function(){
        	auth.$signOut();
            $location.path('/login');
        }
    };
}]);

