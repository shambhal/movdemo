/**

 */
 
 
var app1=angular.module('app1',['ngRoute','geetc','ngMaterial','ngAnimate','geet.services']).config(function($routeProvider,$locationProvider)
{
	$routeProvider.when('/geet/add/',{
		
		
		templateUrl:'/partials/addgeet.html',
		controller:'addController',
	}
	).when('/geet/listings/',{
		
		templateUrl:'partials/geetlist.html',
		controller:'listController',
		
		
	}
	
	
	).when('/geet/edit/:songid',{
		
		templateUrl:'partials/editgeet.html',
		controller:'editController',
		
	}).otherwise({templateUrl:'partials/geetlist.html',
		controller:'listController',});
	
	
	
	
	
	
	$locationProvider.html5Mode(true);
	
	
})