angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope,$state,$rootScope) {
  $scope.logout = function(){


    firebase.auth().signOut().then(function() {
      // Sign-out successful.

      $scope.syncObject.$destroy();
     $state.go("app.login");

    }, function(error) {
      // An error happened.
    });

  }

    $rootScope.uiConfig = {
        'signInSuccessUrl': '#/app/playlists',
        'signInFlow': 'popup',
        'signInOptions': [
          // Leave the lines as is for the providers you want to offer your users.
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ]
      };

      // Initialize the FirebaseUI Widget using Firebase.
      $rootScope.ui = new firebaseui.auth.AuthUI(firebase.auth());
      console.log("Scope ui",$scope.ui)
})

.controller('PlaylistsCtrl', function($scope, $firebaseObject,$rootScope) {

var ref = firebase.database().ref().child("data");
  // download the data into a local object

  // putting a console.log here won't work, see below
    $rootScope.syncObject = $firebaseObject(ref);
  // synchronize the object with a three-way data binding
  // click on `index.html` above to see it used in the DOM!
  $rootScope.syncObject.$bindTo($scope, "data");
})

.controller('PlaylistCtrl', function($scope, $stateParams) {


})

.controller('HomeCtrl', function($scope, $stateParams) {


})

.controller('LoginCtrl', function($scope, $stateParams,$rootScope) {
  console.log("LOGIN")
         // FirebaseUI config.

      // The start method will wait until the DOM is loaded.
      console.log("LOGIN")
      console.log($rootScope.ui)
        $rootScope.ui.start('#firebaseui-auth-container', $rootScope.uiConfig);

});
