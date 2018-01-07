app.controller('MainCtrl', [ 
	'$scope','CommonProp','$http','$firebaseArray','$location',
	function($scope,CommonProp,$http,$firebaseArray,$location) {

		var ref = firebase.database().ref();	//root of the database
		var chatRef = ref.child("chats");
		var chatList = $firebaseArray(chatRef);
		var city = '';
		var lat = '';
		var lon = '';
		
		$scope.email = CommonProp.getUser();
		
		$scope.chatItems = [];
	    $scope.nearchatItems = [];
		
		$http({
		      method: 'GET',
		      url: 'http://ip-api.com/json'
		   }).then(function (success){
			   $scope.city = success.data.city;
			   city = success.data.city;
			   
			   if (navigator.geolocation) {
			        navigator.geolocation.getCurrentPosition(function showPosition(position) {
			        	$scope.locDecimDeg = position.coords.latitude.toFixed(5) + 
			            ", " + position.coords.longitude.toFixed(5);
			        	lat = position.coords.latitude.toFixed(5);
			        	lon = position.coords.longitude.toFixed(5);
			        }, function(error){
			        	switch(error.code) {
				            case error.PERMISSION_DENIED:
				            	$scope.locDecimDeg = "User denied the request for Geolocation."
				                break;
				            case error.POSITION_UNAVAILABLE:
				            	$scope.locDecimDeg = "Location information is unavailable."
				                break;
				            case error.TIMEOUT:
				            	$scope.locDecimDeg = "The request to get user location timed out."
				                break;
				            case error.UNKNOWN_ERROR:
				            	$scope.locDecimDeg = "An unknown error occurred."
				                break;
				        }
			        });
			    } else { 
			    	$scope.locDecimDeg = "Unable to obtain the location.";
			    }
			   
	    	    chatList.$loaded()
	    		    .then(function(){
	    		        angular.forEach(chatList, function(chatList) {
	    		        	if(chatList.owner == CommonProp.getUserId()){
	    			            var link = '!chat/' + chatList.$id;
	    			            $scope.chatItems.push({link:link,title:chatList.chatTitle});
	    		        	}
	    		        	
	    		        	if(chatList.city == city){
	    			            var link = '!chat/' + chatList.$id;
	    		        		$scope.nearchatItems.push({link:link,title:chatList.chatTitle});
	    		        	}
	    		        })
	    		    });
	    	    
			   
		   },function (error){
			   console.log("Unable to obtain the location");
		   });
		
		

	    $('#sidebarCollapse').on('click', function () {
	        $('#sidebar').toggleClass('active');
	    });
	    
	    $scope.toggleAddChat = function() {
	    	$( "#addChatModal" ).toggle();
	    }
	    
	    
	    //add a new chat at the current coordinates
	    $scope.addChat = function() {
	    	chatList.$add({
		        chatTitle: $scope.addChat.title,
		        city: city,
		        latitude: lat,
		        longtitude: lon,
		        owner: CommonProp.getUserId()
		    }).then(function(ref) {
		    	$location.path('/chat/' + ref.key);
		    }, function(error) {
		    	alert("Error:", error);
		    });
	    	
	    };
	    
	    $scope.logout = function() {
	    	CommonProp.logoutUser();
	    };
	    
}]);
