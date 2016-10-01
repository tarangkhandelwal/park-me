// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','firebase', 'auth0.auth0', 'angular-jwt'])

.run(function($ionicPlatform,$state,$rootScope, authService) {
   // Process the auth token if it exists and fetch the profile
    authService.authenticateAndGetProfile();

    // Check is the user authenticated before Ionic platform is ready
    authService.checkAuthOnRefresh();

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }


    authService.checkAuthOnRefresh();

  });


})

.config(function($stateProvider, $urlRouterProvider,angularAuth0Provider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
  .state('app.login', {
    url: '/login',
    cache: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      }
    }
  })

  .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
           controller: 'HomeCtrl'
        }
      }
    })
    .state('app.parking', {
      url: '/parking',
      views: {
        'menuContent': {
          templateUrl: 'templates/parking.html',
          controller: 'ParkingCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');


  // Initialization for the angular-auth0 library
    angularAuth0Provider.init({
      clientID: "V7SOAACmYnLy2EEj1D2BIPpi6i6myE6A",
      domain: "tarang.auth0.com",
      callbackURL: "#/app/home",

    });



});
