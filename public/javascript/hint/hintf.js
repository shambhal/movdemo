



angular.module('hints.services',[]).factory('hintFactory', function($rootScope,$http,$q){
	
	return {
		getRecords: function(songid){
			var def = $q.defer();
		url='hints/retrieve/'+songid;
		$http.get(url).then(function success(res)
		{
			d=res.data;
			//console.log(d);
			def.resolve( d);
			//$rootScope.$broadcast("retrieveMsgs",d);
			
			
		},function fail(res){
			return def.reject(res.data);
			
		});
			
			return def.promise;
		},
		deleter:function(songid)
		{
			var def = $q.defer();
			url='/hint/delete/'+songid;
			$http.delete(url).then(function s(response){
				
				def.resolve( response.data);
				
				
			},function fail(response)
				{
				def.reject(response.data);
					
					
				}

			);
		return def.promise;	
		},
		getHint:function(hintid)
		{
			url='hint/getData/'+hintid;
			var def = $q.defer();
		$http.get(url).then(function success(res)
		{
			d=res.data;
			//console.log(d);
			//$rootScope.$broadcast("setHintData",d);
			def.resolve(d);
			
		},function fail(res){
			
			
			
			
		});
			
		return def.promise;	
			
			
		},
		update:function(obj)
		{var def = $q.defer();
			console.log(obj);
			url='hints/update?id='+obj.hint_id;
			$http.put(url,obj).then(function success(res){
				
				d=res.data;
				def.resolve(d);
				//$rootScope.$broadcast("updateHMsgs",d);
				//console.log(d);
				
				
			},function fail(res){
				d=res.data;
				def.reject(d);
				
				
			});
			return def.promise;	
		},
		save:function(obj)
		{var def = $q.defer();
			url='hints/save';
			$http.put(url,obj).then(function success(res){
				
				d=res.data;
				def.resolve(d);
				//$rootScope.$broadcast("updateHMsgs",d);
				//console.log(d);
				
				
			},function fail(res){
				d=res.data;
				//$rootScope.$broadcast("updateHMsgs",d);
				def.reject(d);
			});
return def.promise;	
		}
		}
	
	
	
});