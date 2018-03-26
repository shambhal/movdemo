angular.module("app",['hints.services']).controller('cs',function ($scope,hintFactory)
{
	$scope.hintarr=[];
	$scope.init=function()
	{
		
		songid='5960bf890694db1690bb6598';
		hintFactory.getRecords(songid).then(function res(data) {
			
			$scope.hintarr=data.records;
			$scope.hcaptions=data.captions;
			
			console.log($scope.hcaptions);
		});
		
		
	}
	$scope.$watch("hintarr",function(nv,ol){//console.log(nv);
	});
	$scope.init();
	
	
}

)
.directive('hintTable', function (hintFactory){
function links(scope)
{
	
	songid='5960bf890694db1690bb6598';
		hintFactory.getRecords(songid).then(function res(data)
		{scope.hcaptions=data.captions;
			scope.hintarr=data.records;
		});
		//scope.init();
}
function link(scope)
{
	scope.$watch("hintarr",function(nv,ov) { console.log(nv);});
	
}

	return{
		restrict:'E',
		link:link,
		transclude:true,
		scoped:{
			hintarr:"=hintarr",
		},
		templateUrl:'/partials/hintlist.html',
		
		
	}
});
	
	
	




