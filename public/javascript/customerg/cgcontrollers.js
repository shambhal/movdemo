



angular.module('mControllers',[]).controller('listController',function($http,$scope,cgFactory){
	//$scope.songid=$routeParams.songid;
	$scope.mode='list';
	$scope.mrights=[];
	$scope.arights=[];
	$scope.usergid=0;
	$scope.list=function()
	{
		
		
	cgFactory.getRecords().then(function (d) {
	//console.log("hi");
	$scope.mode='list';
		//alert("on retrievemsg");
		console.log(d.docs);
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
	$scope.list();
		
		
	
		
		
	}
	$scope.eedit=function(hintid)
	{
		//alert(hintid);
		cgFactory.getRecord(hintid).then(function suc(d){
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
			 cgFactory.deleter(records).then(function success(d){
				 
				 $scope.list();
				 
				 
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
		 /*
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
			
		});*/
		 console.log($scope.userg);
		// $scope.hint.songid=$scope.songid;
		 if($scope.mode=='edit')
			 $scope.userg.id=$scope.usergid;
		cgFactory.save($scope.userg).then(function s(d){
			
			if(d['sflag']==1)
			{
				
				$scope.list();
				
			}
			
			
		});
		
		
	}
	
	//console.log($route);
	$scope.list();
}).controller('addController',function($http,cgFactory,$scope) {
	
	
	
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
		 /*
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
			
		});*/
		 console.log($scope.userg);
		// $scope.hint.songid=$scope.songid;
		cgFactory.save($scope.userg);
		
		
	}
	
	
})


       