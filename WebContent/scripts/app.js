var app = angular.module ( 'GeoChat', [ 
	'ngRoute',
	'firebase'
	] );

app.config (
	[
		'$routeProvider',
		function ( $routeProvider )
		{

			// default page
			var defaultRoute = '/login';

			$routeProvider
				.when(
					'/login', {
						templateUrl: 'views/login.html'
					}
				)
				.when(
					'/register', {
						templateUrl: 'views/register.html'
					}
				)
				.when(
					'/main', {
						templateUrl: 'views/main.html'
					}
				)
				.when(
					'/chat/:id', {
						templateUrl: 'views/chat.html'
					}
				)
				.otherwise (
					{
						redirectTo: defaultRoute
					}
				);
		}
	]
);

app.service('myCoordinates', ['$http', function myCoordinates( $http) {

	var deferred = $q.defer();

	$http({
		      method: 'GET',
		      url: 'http://ip-api.com/json'
		   }).then(function (success){
			   var myCoordinates = {};
				myCoordinates.lat = success.data.lat;
				myCoordinates.lng = success.data.lon;
				myCoordinates.city = success.data.city;
				deferred.resolve(myCoordinates);
		   },function (error){
			   console.log("Unable to obtain the location");
		   });
	
	return deferred.promise;

}]);
