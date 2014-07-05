'use strict';

angular.module('healthcareCensusApp')
  .controller('DatepickerCtrl', function($scope, dateFactory) {

    $scope.today = function() {
    	// debugger;
	    $scope.dt = new Date();
	  };
	  $scope.today();

	  $scope.clear = function () {
	    $scope.dt = null;
	  };

	  $scope.setDate = function(){
	  	dateFactory.setDate($scope.dt);
	  };
	  $scope.setDate();

	  // Disable weekend selection
	  $scope.disabled = function(date, mode) {
	    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
	  };

	  $scope.toggleMin = function() {
	    $scope.minDate = $scope.minDate ? null : new Date();
	    $scope.setDate();
	  };
	  $scope.toggleMin();

	  $scope.open = function($event) {
	    $event.preventDefault();
	    $event.stopPropagation();

	    $scope.opened = true;
	  };

	  $scope.dateOptions = {
	    formatYear: 'yy',
	    startingDay: 1
	  };

	  $scope.initDate = new Date('2016-15-20');
	  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate', 'MM/dd/yyyy'];
	  $scope.format = $scope.formats[4];

	  $scope.$watch('dt', function() {
	    dateFactory.setDate($scope.dt);
	  });

	});