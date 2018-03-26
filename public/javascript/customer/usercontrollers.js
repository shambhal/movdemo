



angular.module('mControllers',[]).controller('listController',function($http,$scope,userFactory){
	//$scope.songid=$routeParams.songid;
	$scope.mode='add';
	
	$scope.userid=0;
	$scope.ugr=0;
	userFactory.getUGs().then(function s(d) {
		$scope.ugs=d;
		//console.log(d);
	});
	$scope.list=function()
	{
		
		
	userFactory.getRecords().then(function suc(data) {
	//console.log("hi");
	$scope.mode='list';
		//alert("on retrievemsg");
		console.log(" d is docs");
		console.log(data);
		//console.log("data above");
		console.log(data.docs);
		$scope.records=data.docs;
		$scope.pagination=data.pagination;
		
		
	},function ff(data){});	
		
	}
	
	$scope.cancel=function()
	{
		$scope.mode='list';//=0;
		//$scope.add=0;
		
	}
	$scope.reloadh=function()
	{
	$scope.list();
		
		
	
		
		
	}
	$scope.eedit=function(hintid)
	{
		//alert(hintid);
		$('#clist tr').removeClass('active');
		$('#tr'+hintid).addClass('active');
		userFactory.getRecord(hintid).then(function suc(d){
			$scope.errflag=0;
			$scope.sflag=0;
			
			//$scope.edit=1;
			$scope.userg={};
			$scope.userg.name=d.name;
			$scope.userg.password=d.password;
			$scope.userg.userg_id=d.userg_id;
			$scope.userg.email=d.email;
			$scope.thumb=d.thumb;
			$scope.userg.status=d.status;
			$scope.mode='edit';
			$scope.userid=d._id;
			
			
		},function fail(d) {
			
			$('#tr'+hintid).removeClass('active');
			
			
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
			 userFactory.deleter(records).then(function success(d){
				 
				 $scope.list();
				 
				 
			 });
			 
			 
		 }
		
		
	}
	$scope.addd=function()
	{
		
		$scope.mode='add';
		
		$scope.userg={};
		
	
		
	}
	$scope.getName=function(idx)
	{
		
		for(i=0;i<$scope.ugs.length;i++)
		{
			
			if($scope.ugs[i]._id==idx)
			{
				console.log(i);
				console.log($scope.ugs[i].name);
				
				
			}
			
			
		}
		
		
	}
	$scope.save2=function(item)
	{/*
		//console.log("hello");
		//console.log($scope);
		console
		*/
		//console.log($scope.userg.ugr);
		/*
		console.log($scope.ugr._name);
		//alert($('#usergname').val());
		//alert($scope.userg.ugid.name);*/
		console.log($('#usergname option:selected').text());
	}
	$scope.save=function()
	{
		$scope.errflag=$scope.sflag='';
		$scope.usergform.$submitted=true;
		//hintform.submit();
		console.log($scope.userg);
		
		 if($scope.usergform.$invalid)
		 {
			 return;
			 
		 }
		 
		ugname=$('#usergname option:selected').text();
		$scope.userg.ugname=ugname;
		 if($scope.mode=='edit')
			 $scope.userg.id=$scope.userid;
		console.log("kkk");
		 $scope.userg.pic=$('#upic').val();
		  console.log($scope.userg);
		userFactory.save($scope.userg).then(function s(d){
			
			if(d['status']=='1')
			{
				
				$scope.list();
				
			}
			
			
		});
		
		
	}
	
	//console.log($route);
	$scope.list();
})

       