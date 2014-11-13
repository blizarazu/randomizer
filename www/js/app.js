// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'filters'])
.service('QuestionsService', function($q){
  return {
    questions: [{"question":"question1","answers":["answer1", "answer2", "answer3"]}],
    getQuestions: function(){
      return this.questions;
    },
    getQuestion: function(questionId) {
      var dfd = $q.dfer();
      this.questions.forEach(function(question){
        if(question.id === questionId)
          dfd.resolve(question);
      });

      return dfd.promise;
    }
  };
})
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
  if(window.cordova && window.cordova.plugins.Keyboard) {
    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
  }
  if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.random_number', {
    url: "/random_number",
    views: {
      'menuContent' :{
        templateUrl: "templates/random_number.html",
        controller: 'RandomNumberCtrl'
      }
    }
  })

  .state('app.questions', {
    url: "/questions",
    views: {
      'menuContent' :{
        templateUrl: "templates/questions.html",
        controller: 'QuestionsCtrl',
        resolve: {
          questions: function(QuestionsService){
            console.log("Getting questions: " + QuestionsService.getQuestions());
            return QuestionsService.getQuestions();
          }
        }
      }
    }
  })

  .state('app.add_question', {
    url: "/question/add_question",
    views: {
      'menuContent' :{
        templateUrl: "templates/add_question.html",
        controller: 'AddQuestionCtrl',
        resolve: {
          questions: function(QuestionsService) {
            return QuestionsService.getQuestions();
          }
        }
      }
    }
  });
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/random_number');
});

