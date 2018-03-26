
angular.module('app',['ngMaterial','ngAnimate']).controller('songl',function($http,$scope)
       {
    	 // $scope.error.moviename='';
     	 $scope.page=1;
		 
		 $scope.page_limit=10;
		 $scope.filter=function()
		 {
			 
			 
			 
			 
		 },
		 
		 $scope.getMatches=function()
		 {
			return[
			{name:'siddharth',movie:'vansh'},
				{name:'Madhuri',movie:'Dil'},
			
			
			] ;
			 
			 
		 }
   $scope.delete=function()
   {
	  // alert("hi");
	   //console.log($scope.listform.records);
	   //console.log($scope.dels);
	  // console.log($scope.dels.records);
	  // console.log($scope);
	   //console.log()
	  // return;
	   //console.log($scope.listform);
	 var cs=  $('input[name*=\'records\']:checked');
	// console.log(cs);
	$(cs).each(function(k,v){
		console.log(v);
		console.log(v.value);
		$scope._innerdel(v.value);
		
	}


	);$scope.load();
   };
   $scope._innerdel=function(d)
   {
	   url='/geet/delete/'+d;
	   data={songid:d};
	  // console.log(data);
	$http.delete(url,data).then(function success(r){
		
		
		
	},function fa(r){} )  ; 
	   
   };
   $scope.load=function()
   {
	   var url='/geet/lista?page='+$scope.page+'&pl='+$scope.page_limit;
	  
	   $http.get(url, {
       
    }).then(function success(response){
		   
		   d=response.data;
		   $scope.arr=d.docs;
		   $scope.pages=d.pageobj.pages;
		   
	   } ,function fail(){});
	   
	   
   }
   $scope.load();
    
       });
       
  