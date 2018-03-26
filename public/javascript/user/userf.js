



angular.module('user.services',[]).factory('userFactory', function($rootScope,$http,$q){
	
	return {
		
		getRecord:function(songid)
		{
			obj=$q.defer();
			url='/user/get/'+songid;
			$http.get(url).then(function success(response){
			obj.resolve(response.data);	
			},function fail(response){
				obj.reject(response.data);
				
			});
			return obj.promise;
		},
		getUGs:function()
		{
			obj=$q.defer();
			url='/user/getUGs/';
			$http.get(url).then(function success(response){
				//console.log(response.data);
			obj.resolve(response.data);	
			},function fail(response){
				obj.reject(response.data);
				
			});
			return obj.promise;
			
			
		},
		getRecords:function(filters)
		{
			obj1=$q.defer();
			url='/user/retrieve/';
			f=0;
			angular.forEach(filters,function(v,key)
			{
				sign=(f==0)?'?':'&';
				f=f+1;
				
				//alert(v.key);
				//console.log(v);
				var obj=v;
				angular.forEach(obj,function(v1,key1)
				{
				url=url +sign+key1+'='+encodeURIComponent(v1);
				});
				
			})
			//console.log(url);
			$http.get(url).then(function success (response){
				console.log(response);
				//$scope.arr=response.data;
				obj1.resolve(response.data);
				//$rootScope.$broadcast("onfilmsdata",response.data);
				
			}, function failure(response){
				
				obj1.reject(response.data);
				
			}   );
			return obj1.promise;
		},
		
		deleter:function(songs)
		{
			var def = $q.defer();
			//console.log(songs);
			s={'users':songs};
			url='/user/remove/';
			$http.post(url,s).then(function s(response){
				
				def.resolve( response.data);
				
				
			},function fail(response)
				{
				def.reject(response.data);
					
					
				}

			);
			return def.promise;
			
		},
		
		save:function(data)
		{
			url='user/save';
			obj=$q.defer();
			$http.put(url,data).then(function success(response){
				
				
				obj.resolve(response.data);	
				//$rootScope.$broadcast("updateHMsgs",d);
				//console.log(d);
				
				
			},function fail(response){
				obj.reject(response.data);	
				
			});
		return obj.promise;	
		}
		}
	
	
	
});