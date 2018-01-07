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
