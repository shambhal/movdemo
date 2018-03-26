



angular.module('cg.services',[]).factory('cgFactory', function($rootScope,$http,$q){
	
	return {
		
		getRecord:function(songid)
		{
			obj=$q.defer();
			url='/cg/get/'+songid;
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
			url='/cg/retrieve/';
			f=0;
			angular.forEach(filters,function(key,v)
			{
				sign=(f==0)?'?':'&';
				f=f+1;
				url=url +sign+key+'='+encodeURIComponent(v);
				
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
			url='/cg/remove/';
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
			url='cg/save';
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