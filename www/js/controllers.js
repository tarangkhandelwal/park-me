angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope,$state,$rootScope,authService) {
  $scope.logout = function(){
      authService.logout();
      $state.go("app.login")
  };

  $scope.login = function() {
      authService.login();


    }

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

.controller('HomeCtrl', function($scope, $stateParams, authService) {

   $scope.$on("$ionicView.beforeEnter", function() {
      $scope.user = authService.getUserProfile();
    });


})

.controller('LoginCtrl', function($scope, $stateParams,$rootScope,authService) {

    $scope.loginWithGoogle = authService.loginWithGoogle;
    $scope.user = {};
    // Log in with username and password
    $scope.login = function() {
      authService.login($scope.user.username, $scope.user.password);
    }


});
