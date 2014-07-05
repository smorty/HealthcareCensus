'use strict';

angular.module('healthcareCensusApp')
	.factory('dateFactory', function($http, $q){
		var date = new Date();
		return{
			setDate: function(newDate){
				date = newDate;
			},
			getDate: function(){
				return moment(date).format('YYYY-MM-DD');
			},
			setObj: function(center, date, census){
				var centerNo = 0;
				var setNo = function(){
					if(center==='ACenterA'){
						centerNo = 2;
					} else if(center==='BCenterB'){
						centerNo = 3
					} else if(center==='CCenterC'){
						centerNo = 4
					} else if(center==='DCenterD'){
						centerNo = 5
					} else if(center==='ECenterE'){
						centerNo = 7
					}
				};
				setNo();
				var deferred = $q.defer();
				$http({
					method: 'POST',
					url: 'http://localhost:9001/',
					data: {CenterNo: centerNo, Center: center, Date: date, Census: census}
				}).success(function(data){
					deferred.resolve(data);
				}).error(function(err){
					deferred.reject(err);
				});
				return deferred.promise;
			},
			getObj: function(center, date){
		    	var deferred = $q.defer();
				$http({method: 'GET', url: 'http://localhost:9001/', params: {Center: center, Date: date}}).success(function(data) {
			      deferred.resolve(data);
			    });
			  	return deferred.promise;
			},
			delObj: function(center, date){
		    	var deferred = $q.defer();
				$http({method: 'GET', url: 'http://localhost:9001/delete', params: {Center: center, Date: date}}).success(function(data) {
			      deferred.resolve(data);
			    });
			  	return deferred.promise;
			}
	};
});