  // Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', [
  'ionic',
  'starter.controllers',
  'starter.services' ,
  'ngCordova',
  'ngMessages'])

.constant('INFO_DB',{ //nombre y version de la bd que estamos usando
  NAME: "biogamdb",
  VERSION: "2",
})
  .constant('CONFIG',{ 
  URL:  'http://192.168.175.2',
})

.run(function($ionicPlatform, $state) {


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
 
    
    function onDeviceReady(){
        $state.go('welcome'); 
      }

  });


}
)

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

 $ionicConfigProvider.tabs.position('bottom');
 
  $ionicConfigProvider.backButton.text('')
  $ionicConfigProvider.backButton.icon('ion-chevron-left');
  $ionicConfigProvider.backButton.previousTitleText(false);

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
          controller: 'HomeCtrl',
           cache: false
        }
      }
    })

///////////////////////////////////////// ESTADO ELECCION DE CATEGORIA ////////////////////////////////////////////
    
     .state('welcome', {
      templateUrl: 'app/templates/loading.html',
      controller: 'welcomeCtrl'
   
      })

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
          controller: 'TheoryCtrl',
           cache: false
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
          cache: false
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
   
   
//////////////////////////////////////// ESTADOS TEST /////////////////////////////////////////////////////////
   
   .state('home.categories.3.test-results', {
      url: '/test-results',
      views: {
        'home-tab@tabs': {
          templateUrl: 'app/templates/test-results.html',
          controller: 'ScoreTestCtrl'
        }
      }
    })
   

//////////////////////////////////////// REGISTRO ///////////////////////////////////////////////////////// 
   
 .state('register', {
      url: '/register',
      //parent: 'scaffold',
      templateUrl: 'app/templates/register.html',
      controller: 'RegisterCtrl'
     
   })  

  .state('login', {
      url: '/login',
      //parent: 'scaffold',
      templateUrl: 'app/templates/login.html',
      controller: 'LoginCtrl'     
   });

  $urlRouterProvider.otherwise('home');
});


