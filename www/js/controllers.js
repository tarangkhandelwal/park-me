angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope,$state,$rootScope) {
  $scope.logout = function(){
  };

})
.controller('ParkingCtrl', function($scope, $rootScope,$stateParams,$firebaseObject) {
  //3 way data binding
  var ref = firebase.database().ref();
  var slotRef= ref.child("slots")
    $rootScope.syncObject = $firebaseObject(slotRef);
    $rootScope.syncObject.$bindTo($scope, "parkingObjs");

   var parkingObjs = {
  "p1":{
    type: "car",
    booked: false
  },
  "p2":{
    type: "car",
    booked: false
  },
  "p3":{
    type: "car",
    booked: false
  }
  };

  $scope.reset = function(){
    firebase.database().ref('slots').set(parkingObjs);
  }
})

.controller('HomeCtrl', function($scope, $stateParams) {


})

.controller('LoginCtrl', function($scope, $stateParams,$rootScope) {

});
