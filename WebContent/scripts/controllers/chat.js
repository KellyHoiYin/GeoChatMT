app.controller('ChatCtrl', [
	'$scope', '$routeParams','$firebaseArray','CommonProp', 
	function($scope,$routeParams, $firebaseArray,CommonProp) {
		
		$scope.id = $routeParams.id;
		$scope.email = CommonProp.getUser();
		
		var ref = firebase.database().ref();	//root of the database
		var chatRef = ref.child("chats");
		var chatList = $firebaseArray(chatRef);
		
	    $('#sidebarCollapse').on('click', function () {
	        $('#sidebar').toggleClass('active');
	    });
	    
	    $scope.chatItems = [];
	    var curChat = [];
	    
	    chatList.$loaded()
		    .then(function(){
		        angular.forEach(chatList, function(chatList) {
		        	if(chatList.owner == CommonProp.getUserId()){
			            var link = '!chat/' + chatList.$id;
			            $scope.chatItems.push({link:link,title:chatList.chatTitle});
		        	}
		        })
		        
				$scope.chatTitle = chatList.$getRecord($scope.id).chatTitle;
		    });
	    
		var postRef = ref.child("chats").child($scope.id).child("posts");
		var postList = $firebaseArray(postRef);
	    
	    $scope.addPost = function() {	    	
	    	postList.$add({
		        user: CommonProp.getUser(),
		        post: $scope.addPost.content
		    }).then(function(ref) {
		    	//clear the content of the input
		    	$scope.addPost.content = '';
		    }, function(error) {
		    	alert("Error:", error);
		    });
		}
	    
	    // update the posts according to the database 
	    $scope.posts = $firebaseArray(postRef);
	    
	    $scope.logout = function() {
	    	CommonProp.logoutUser();
	    };
	    
}]);