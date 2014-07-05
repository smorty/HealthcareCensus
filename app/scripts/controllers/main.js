'use strict';

/**
 * @ngdoc function
 * @name healthcareCensusApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the healthcareCensusApp
 */
angular.module('healthcareCensusApp')
  .controller('MainCtrl', function($scope, dateFactory) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.center = 'Select Center';
    $scope.census = null;
    $scope.jumbo = false;

    $scope.selectCenter = function(center){
    	$scope.center = center;
    };

    // $scope.dateHope = angular.element('#dateText').val();
    // console.log($scope.dateHope);

    $scope.date = dateFactory.getDate();
    $scope.delShow = true;

    $scope.viewData = function(){
      $scope.date = dateFactory.getDate();
      dateFactory.getObj($scope.center, $scope.date, $scope.census).then(function(data){
        if ($scope.center === 'Select Center'){
          alert('Please select a center.');
          return $scope.center;
        } else if(data.Center) {
          $scope.obj = {Center: 'Center: '+data.Center, Date: 'Date: '+moment.utc(data.Date).format('MM-DD-YYYY'), Census: 'Census: '+data.Census};
          console.log(data);
          $scope.delShow=true;
          $scope.jumbo=true;
        } else {
          $scope.obj = {message: 'We don\'t have any data for this day.'};
          $scope.jumbo=true;
          $scope.delShow=false;
        }
      });
    };

    $scope.submit = function(){
      $scope.date = dateFactory.getDate();
      var numCheck = /[^0-9]/;
      dateFactory.getObj($scope.center, $scope.date, $scope.census).then(function(data){
        if(data.Center){
          $scope.obj = {message:'We already have data for this day - if you would like to replace existing data, please delete and resubmit.'};
          return $scope.obj;
        } else if (numCheck.test($scope.census)) {
          $scope.obj = {message:'Looks like you\'re trying to submit something in the incorrect format. Make sure your census is really a number.'};
          $scope.delShow = false;
          $scope.jumbo=true;
          console.log($scope.census);
          console.log(parseInt($scope.census));
          return $scope.census;
        } else if ($scope.center === 'Select Center'){
          $scope.obj = {message:'Please select a center before you try to submit.'};
          $scope.delShow=false;
          return $scope.obj;
        } else {
          dateFactory.setObj($scope.center, $scope.date, $scope.census).then(function(data){
            console.log(data);
            $scope.obj = {Center: 'Center: '+data.Center, Date: 'Date: '+moment.utc(data.Date).format('MM-DD-YYYY'), Census: 'Census: '+data.Census};
            $scope.delShow=true;
            $scope.jumbo=true;
            $scope.census=null;
            return $scope.obj;
          });
        };
      })
    };

    $scope.delete = function(){
      dateFactory.getObj($scope.center, $scope.date, $scope.census).then(function(data){
        if(data.Center){
          if(confirm('Do you really want to delete data for '+$scope.center+' on '+$scope.date+'?')){
            $scope.date = dateFactory.getDate();
            dateFactory.delObj($scope.center, $scope.date, $scope.census).then(function(data){
              $scope.obj = {message: 'Row deleted'};
              $scope.jumbo=true;
              $scope.delShow=false;
            });
          }
        } else {
          $scope.obj = {message: 'Can\'t delete - we don\'t have any data for this day!'};
        };
      });
    };

  });