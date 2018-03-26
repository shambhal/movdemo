



angular.module('mControllers',[]).controller('listController',function($http,$routeParams,$scope,hintFactory){
	//$scope.songid=$routeParams.songid;
	$scope.songid=songid;
	$scope.mukhda=mukhda;
	$scope.hint={};
	hintFactory.getRecords($scope.songid).then(function (d) {
	//console.log("hi");
	
		//alert("on retrievemsg");
		console.log(d.records);
		$scope.records=d.records;
		$scope.captions=d.captions;
		
		
	});
	$scope.cancel=function()
	{
		$scope.edit=0;
		$scope.add=0;
		
	}
	$scope.reloadh=function()
	{
		hintFactory.getRecords($scope.songid).then(function (d) {
	//console.log("hi");
	
		//alert("on retrievemsg");
		console.log(d.records);
		$scope.records=d.records;
		$scope.captions=d.captions;
		
		
	});
		
		
	}
	$scope.eedit=function(hintid)
	{
		
		hintFactory.getHint(hintid).then(function suc(d){
			$scope.errflag=0;
			$scope.sflag=0;
			
			$scope.edit=1;
			$scope.hint.hint=d.hint;
			$scope.hint.sort_order=d.sort_order;
			$scope.hint.hint_id=hintid;
			$scope.hint.songid=d.songid;
			
		});
		
		
	}
	$scope.deletee=function()
	{
		
		arr=$('input[name=\'reco\']:checked');
		console.log(arr);
		records=[];
		angular.forEach(arr ,function(k,v){
			
			hintid=k.value;
			records.push(hintid);
			hintFactory.deleter(hintid).then(function res(data) {
				$scope.reloadh();
				
			});
		});
		
		
		
	}
	$scope.addd=function()
	{
		//alert("in add");
		$scope.add=1;
		//$scope.hint={};
		$scope.hint.hint='';
		$scope.hint.songid=$scope.songid;
		//alert($scope.songid);
		
	}
	$scope.update=function()
	{
		
		$scope.sflag=$scope.errflag=0;
		$scope.editform.$submitted=true;
   if(!$scope.editform.$valid)
   {
	   //alert("not valid");
	   console.log($scope.editform);
	   return;
	   
   }	   

		if($scope.edit)
		 {
			
			hintFactory.update($scope.hint).then(function res(data) {
				
				 if(data['errors'])
				 {
					 $scope.errors=data['errors'];
					 $scope.errflag=1;
					 
					 
				 }
				  if(data['sflag'])
				  {
					  $scope.sflag=1;
					  $scope.msg=data['msg'];
					  $scope.reloadh();
					  $scope.cancel();
				  }
				
				
				
			});
			 
			 
		 }
		 if($scope.add)
		 {
			 hintFactory.save($scope.hint).then(function res(data) {
				
				 if(data['errors'])
				 {
					 $scope.errors=data['errors'];
					 $scope.errflag=1;
					 
					 
				 }
				  if(data['sflag'])
				  {
					  $scope.sflag=1;
					  $scope.msg=data['msg'];
					  
					   $scope.reloadh();
				  }
				
				
				
			});
			 
			 
			 
			 
			 
		 }
		
		
		
	}
	//console.log($route);
	
}).controller('addController',function($http,hintFactory,$routeParams,$scope) {
	
	//$scope.mukhda=mtitle;
	//$scope.songid=songid;
	songid=$routeParams.songid;

	//$scope.$apply(function(){$scope.songid=$routeParams.songid;});
	$scope.songid=songid;
	//alert($scope.songid);
	$scope.$on("updateHMsgs",function(event,ret){
		//alert("calling updatehmsgs");
		console.log(ret);
		 if(ret['errflag'])
		 {
			 $scope.errflag=true;
			 $scope.errors=$ret['errors'];
		 }
		  if(ret['sflag'])
		  {
			$scope.sflag=true;  
			  $scope.success=ret['msg'];
		  }
		
	});
	$scope.save=function()
	{
		$scope.errflag=$scope.sflag='';
		//$scope.hintform.$submitted=true;
		//hintform.submit();
		console.log($scope.hintform);
		 if($scope.hintform.$invalid)
		 {
			// return;
			 
		 }
		 $scope.hint.songid=$scope.songid;
		hintFactory.save($scope.hint);
		
		
	}
	
	
}).controller('editController',function($scope,hintFactory,$routeParams){
	//alert("hello");
	hintid=$scope.hintid=$routeParams.hintid;
	hintFactory.getHint(hintid);
	$scope.hint={};
	$scope.$on('setHintData',function (event,da)
	{
		//alert("sething data");
		//console.log("dobject");
		//console.log(d);
		alert(da['hint']);
		//alert(d);
		$scope.hint.hint=da.hint;
		$scope.hint.sort_order=da['sort_order'];
		
		
	});
	
	$scope.updates=function()
	{
		
		$scope.errflag=$scope.sflag='';
		//$scope.hintform.$submitted=true;
		//hintform.submit();
		console.log($scope.hintform);
		 if($scope.hintform.$invalid)
		 {
			// return;
			 
		 }
		 $scope.hint.songid=$scope.songid;
		hintFactory.update($scope.hint);
		
	}
	
	
	
})



       