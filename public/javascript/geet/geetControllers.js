



angular.module('geetc',[]).controller('listController',function($http,$scope,geetFactory,$location){
	
	$scope.pagination={};
	//$scope.$on("setGeet",function(){});
 $scope.getMatches=function(param)
		 {
			 console.log(param);
			 /*
			return[
			{name:'siddharth',movie:'vansh'},
				{name:'Madhuri',movie:'Dil hai ki manta nahin'},
			
			
			] ;*/
			
			url='/geet/autocompletem/'+param;
			return $http.get(url).then(function success(res)
			{
				
				return res.data;
				
			});
			 
			 
		 },
		 $scope.$on("onfilmsdata",function (event,args){
			 console.log(args.docs);
			 $scope.pages={};
			 $scope.arr=args.docs;
			 $scope.pagination.pages=args.pagination.pages;
			 $scope.pagination.prev=args.pagination.prev;
			 $scope.pagination.next=args.pagination.next;
			 
		 } )
		 $scope.filter=function()
		 {
			 filters=[];
			 //console.log($scope.item);
			 if($scope.item.moviename)
			 {
			 filter_movie=$scope.item.moviename;
			 console.log($scope.item.moviename);
			 filters.push({'moviename':$scope.item.moviename});			 }
			 if($scope.filter_year)
			 {filters.push({'movieyear':$scope.filter_year});
				 filter_year=$scope.filter_year;
			 }
			 return geetFactory.getRecords(filters);
			
		 }
		 $scope.delete=function()
		 {//alert("dd");
			 arr=$('input[name*=\'records\']:checked');
			 console.log(arr);
			 var records=[];
			angular.forEach(arr ,function(k,v){
				//console.log("key="+k.val());
				//console.log("value="+v.val());
				//console.log(k);
				records.push(k.value);
				console.log(k.value);
				//console.log(v);
				
			});
			console.log(records);
			geetFactory.deleter(records).then(function s(d) {
				
				console.log(d);
				
			} ,function f(d) {
				
				console.log(d);
				
			} );
			 
		 }
		 $scope.pagec=function(page)
		 {
			// console.log(page);
			 eval('$scope.'+page.onc);
			 
		 }
		 $scope.showp=function(pagen)
		 {
			 
			filters=[];
		 obj=$location.search();
		 $.each(obj,function (k,v)
		 {
			 
			 filters.push({k,v});
		 });
		 filters.push({'page':pagen});


	 geetFactory.getRecords(filters).then(function succ(args) {
			
			 $scope.pages={};
			 $scope.arr=args.docs;
			 $scope.pagination.pages=args.pagination.pages;
			 $scope.pagination.prev=args.pagination.prev;
			 $scope.pagination.next=args.pagination.next;
			 
			 
			 
		 } ,function fail(resp) {
			 
		 });		 
			 
		 }
		 $scope.init=function()
		 {filters=[];
		 obj=$location.search();
		 $.each(obj,function (k,v)
		 {
			 
			 filters.push({k,v});
		 });
		 geetFactory.getRecords(filters).then(function succ(args) {
			
			 $scope.pages={};
			 $scope.arr=args.docs;
			 $scope.pagination.pages=args.pagination.pages;
			 $scope.pagination.prev=args.pagination.prev;
			 $scope.pagination.next=args.pagination.next;
			 
		 } ,function fail(resp) {
			 
		 });
}
		
$scope.init();
});
/*
app1.run(['$route', function($route) {
$route.reload();
}]);*/