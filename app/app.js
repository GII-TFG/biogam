	// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','starter.controllers','starter.services' , 'ngCordova' ])

.run(function($ionicPlatform, $state, $rootScope, $cordovaSQLite, DB) {
  $ionicPlatform.ready(function() {

    if(window.cordova && window.cordova.plugins.Keyboard) {

       document.addEventListener("deviceready", onDeviceReady, false);

    
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);


      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);


    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    
    function onDeviceReady(){
        DB.init();
        $state.go('home'); //cambiar a home
    }

  });


}
)

.config(function($stateProvider, $urlRouterProvider) {

   $stateProvider

/////////////////////////////////////// ESTADO INICIAL /////////////////////////////////////////////////

    
    .state('scaffold', {
    abstract: true,
    templateUrl: "app/templates/scaffold.html"
    })
    .state('tabs', {
      url: '/tab',
      parent: 'scaffold',
      abstract: true,
      templateUrl: "app/templates/tabs.html"
    })

    .state('home', {
      url: '/home',
      parent: "tabs",
      views: {
        'home-tab':{
        templateUrl: 'app/templates/home.html',
        controller: 'HomeCtrl'
       }
      }
    })

///////////////////////////////////////// ESTADO ELECCION DE CATEGORIA ////////////////////////////////////////////
    
    .state('home.categories', {
    url: '/categories',
    views: {
        'home-tab@tabs': { //remember @ choose the state to go
          templateUrl: 'app/templates/page2TET.html',
          controller: 'CategoriesCtrl'   
        }
      }
    })

 ////////////////////////////////////////// ESTADOS CATEGORIAS CONCRETAS //////////////////////////////////////////////////   
    /*
      1.-Theory
      2.-Exercises
      3.-Test
    */
    .state('home.categories.1', {
      url: '/theory',
      views: {
        'home-tab@tabs': {
          templateUrl: 'app/templates/theory.html',
          controller: 'TheoryCtrl'
        }
      }
    })

     .state('home.categories.2', {
      url: '/exercises',
      views: {
        'home-tab@tabs': {
          templateUrl: 'app/templates/exercises.html',
          controller: 'ExerCtrl'
        }
      }
    })


      .state('home.categories.3', {
      url: '/theory',
      views: {
        'home-tab@tabs': {
          templateUrl: 'app/templates/test.html',
          controller: 'TestCtrl',
          resolve:{
            /*no tocar si no se entiende, preguntar a Gian */
            listaPreguntas: function(Test, $rootScope, $q, $timeout){

              var deferred = $q.defer();
              var proceso = function(){
              var list = Test.getPreguntasTest($rootScope.temaId);
              $timeout(function(){
              deferred.resolve(list); }, 10);
              }
              proceso();
              return deferred.promise;

            }
          }
        }
      }
    })

///////////////////////////////////////// ESTADOS DE UN EJERCICIO ///////////////////////////////////////////////////


   .state('home.categories.2.Exerlist', {
      url: '/exercises-list',
      views: {
        'home-tab@tabs': {
          templateUrl: 'app/templates/exercises-list.html',
          controller: 'ExerListCtrl'
        }
      }
    })

   
   .state('home.categories.2.Exerlist.level', {
      url: '/level',
      views: {
        'home-tab@tabs': {
          templateUrl: 'app/templates/level.html',
          controller: 'LevelCtrl'
        }
      }
    })
       // $urlRouterProvider.otherwise('');

//////////////////////////////////////// ESTADOS TEORIA /////////////////////////////////////////////////////////

.state('home.categories.1.detail', {
      url: '/detail',
      views: {
        'home-tab@tabs': {
          templateUrl: 'app/templates/completeTheory.html',
          controller: 'CompleteTheoryCtrl'
        }
      }
    })
   
   //////////////////////////////////////// REGISTRO ///////////////////////////////////////////////////////// 
   
 .state('register', {
      url: '/register',
      parent: "tabs",
      views: {
        'home-tab':{
        templateUrl: 'app/templates/register.html',
        controller: 'RegisterCtrl'
       }
      }
   })  

});
