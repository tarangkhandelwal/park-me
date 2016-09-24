angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope,$state,$rootScope) {
  $scope.logout = function(){


    firebase.auth().signOut().then(function() {
      // Sign-out successful.

     $scope.syncObject.$destroy();
     //$state.go("app.login");

    }, function(error) {
      // An error happened.
    });

  }

    //firebaseUi configuration
    $rootScope.uiConfig = {
        'signInSuccessUrl': '#/app/home',
        'signInFlow': 'popup',
        'signInOptions': [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ]
      };

      // Initialize the FirebaseUI Widget using Firebase.
      $rootScope.ui = new firebaseui.auth.AuthUI(firebase.auth());
      console.log("Scope ui",$scope.ui)
})

.controller('PlaylistsCtrl', function($scope,$rootScope) {


})

.controller('ParkingCtrl', function($scope, $rootScope,$stateParams,$firebaseObject) {
  var ref = firebase.database().ref();
  var slotRef= ref.child("slots")
  // download the data into a local object

  // putting a console.log here won't work, see below
    $rootScope.syncObject = $firebaseObject(slotRef);
  // synchronize the object with a three-way data binding
  // click on `index.html` above to see it used in the DOM!
    $rootScope.syncObject.$bindTo($scope, "parkingObjs");
/*
    ref.once("value", function(snapshot) {
  var a = snapshot.child("rooms").exists();
  console.log(a,"EXISTS")
});
*/


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
         // FirebaseUI config.

      // The start method will wait until the DOM is loaded.
      console.log("LOGIN")
      console.log($rootScope.ui)
        $rootScope.ui.start('#firebaseui-auth-container', $rootScope.uiConfig);

});
