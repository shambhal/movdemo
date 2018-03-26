



angular.module('userg.services',[]).factory('usergFactory', function($rootScope,$http,$q){
	
	return {
		
		getRecord:function(songid)
		{
			obj=$q.defer();
			url='/userg/get/'+songid;
			$http.get(url).then(function success(response){
			obj.resolve(response.data);	
			},function fail(response){
				obj.reject(response.data);
				
			});
			return obj.promise;
		},
		getRecords:function(filters)
		{
			obj=$q.defer();
			url='/userg/retrieve/';
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
				//console.log(response.data);
				//$scope.arr=response.data;
				obj.resolve(response.data);
				//$rootScope.$broadcast("onfilmsdata",response.data);
				
			}, function failure(response){
				
				obj.reject(response.data);
				
			}   );
			return obj.promise;
		},
		autocomplete:function(param)
		{
			url='/geet/autocompletem/'+param;
			$http.get(url).then(function success(res)
			{
				
				d=res.data;
				$rootScope.$broadcast('autocompletem',d);
			});
			
		},
		deleter:function(songs)
		{
			var def = $q.defer();
			//console.log(songs);
			s={'usergs':songs};
			url='/userg/remove/';
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
			url='userg/save';
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