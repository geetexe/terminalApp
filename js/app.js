var app = angular.module("myApp",["ngRoute"]);

app.config(function($routeProvider){
	$routeProvider
	.when("/",{
		templateUrl:'views/home.html'
	})
	.when("/contact",{
		templateUrl: 'views/contact.html'
	})
	.when("/linkA",{
		templateUrl: 'views/linkA.html'
	})
	.when("/anotherLink",{
		templateUrl: 'views/another.html'
	})
	.when("/terminal",{
		templateUrl: 'views/terminal.html'
	})
	.when("/404", {
		templateUrl: 'views/404.html'
	})
	.otherwise(
	{
		redirectTo:'/404'
	})
});