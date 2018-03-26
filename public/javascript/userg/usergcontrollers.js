



angular.module('mControllers',[]).controller('listController',function($http,$scope,usergFactory,$location){
	//$scope.songid=$routeParams.songid;
	$scope.mode='list';
	$scope.mrights=[];
	$scope.arights=[];
	$scope.usergid=0;
	$scope.list=function(filters)
	{
		
		
	usergFactory.getRecords(filters).then(function (d) {
	//console.log("hi");
	$scope.mode='list';
		//alert("on retrievemsg");
		
		$scope.records=d.docs;
		$scope.pagination=d.pagination;
		
		
	});	
		
	}
	
	$scope.cancel=function()
	{
		$scope.edit=0;
		$scope.add=0;
		$scope.mode='list';
	}
	$scope.reloadh=function()
	{
		var filters=[];
	$scope.list(filters);
		
		
	
		
		
	}
	$scope.eedit=function(hintid)
	{
		//alert(hintid);
		usergFactory.getRecord(hintid).then(function suc(d){
			$scope.errflag=0;
			$scope.sflag=0;
			
			//$scope.edit=1;
			$scope.userg={};
			
			$scope.mrights=d.mrights;
			$scope.userg.name=d.name;
			$scope.arights=d.arights;
			$scope.mode='edit';
			$scope.usergid=d._id;
			$scope.setRights();
			
		});
		
		
	}
	$scope.setRights=function()
	{
		
		 temp=$("input[name='arights']");
		  temp2=$("input[name='mrights']");
		
		  $.each(temp,function(index,ctl){
			  
			 v= ctl.value;
			 
			 if($.inArray(v,$scope.arights)>-1 && $scope.arights.length>0)
			 {
				 
				 $(this).prop('checked',true);
				 
			 }
			 else{
				 
				 $(this).prop('checked',false); 
				 
			 }
				 
			  
			  
		  });
		  $.each(temp2,function(index,ctl){
			  
			 vv= ctl.value;
			
			 if($.inArray(vv,$scope.mrights)>-1 && $scope.mrights.length>0)
			 { 
				 $(this).prop('checked',true);
//$(ctl).prop('checked',true);
				 
			 }
			 else{
				 
				 $(this).prop('checked',false);  
			 }
				 
			  
			  
		  });
		
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
		 $scope.list(filters);
		
	}	
	$scope.deletee=function()
	{
		
		arr=$('input[name=\'reco\']:checked');
		console.log(arr);
		records=[];
		angular.forEach(arr ,function(k,v){
			
			hintid=k.value;
			records.push(hintid);
			
		});
		 if(records.length>0)
		 {
			 usergFactory.deleter(records).then(function success(d){
				 var filters=[];
				 $scope.list(filters);
				 
				 
			 });
			 
			 
		 }
		
		
	}
	$scope.addd=function()
	{
		
		$scope.mode='add';
		$scope.mrights=[];
		$scope.arights=[];
		$scope.userg={};
		$scope.setRights();
	
		
	}
	$scope.save=function()
	{
		$scope.errflag=$scope.sflag='';
		//$scope.hintform.$submitted=true;
		//hintform.submit();
		//console.log($scope.userg);
		
		
		 if($scope.usergform.$invalid)
		 {
			// return;
			 
		 }
		 temp=$("input[name='arights']:checked");
		  temp2=$("input[name='mrights']:checked");
		$scope.userg.arights=[];
		$scope.userg.mrights=[];
		temp.each(function(index,ctl){
			//console.log(ctl);
			$scope.userg.arights.push(ctl.value);
			
		});
		temp2.each(function(index,ctl){
			//console.log(ctl);
			$scope.userg.mrights.push(ctl.value);
			
		});
		 console.log($scope.userg);
		// $scope.hint.songid=$scope.songid;
		 if($scope.mode=='edit')
			 $scope.userg.id=$scope.usergid;
		usergFactory.save($scope.userg).then(function s(d){
			
			if(d['sflag']==1)
			{
				var filters=[];
				$scope.list(filters);
				
			}
			 if(d['error'])
			 {
				 
				 alert(d['error']);
				 
			 }
			
			
		});
		
		
	}
	
	//console.log($route);
	$scope.list();
}).controller('addController',function($http,usergFactory,$scope) {
	
	

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
		//console.log($scope.userg);
		
		
		 if($scope.usergform.$invalid)
		 {
			// return;
			 
		 }
		 temp=$("input[name='arights']:checked");
		  temp2=$("input[name='mrights']:checked");
		$scope.userg.arights=[];
		$scope.userg.mrights=[];
		temp.each(function(index,ctl){
			//console.log(ctl);
			$scope.userg.arights.push(ctl.value);
			
		});
		temp2.each(function(index,ctl){
			//console.log(ctl);
			$scope.userg.mrights.push(ctl.value);
			
		});
		 console.log($scope.userg);
		// $scope.hint.songid=$scope.songid;
		usergFactory.save($scope.userg);
		
		
	}
	
	
})


       