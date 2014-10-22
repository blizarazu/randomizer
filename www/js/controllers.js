angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
  { title: 'Reggae', id: 1 },
  { title: 'Chill', id: 2 },
  { title: 'Dubstep', id: 3 },
  { title: 'Indie', id: 4 },
  { title: 'Rap', id: 5 },
  { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('RandomNumberCtrl', function($scope, $timeout){
  var digitCount = 1;
  
  var timerCount = 0;

  // Problems appear with more than 15 digits
  $scope.maxDigits = 15;

  function newRandom(digits) {
    var digits = typeof digits !== 'undefined'? digits : 1;

    var random = Math.floor((Math.random() * 10));
    for (var i = 1; i < digits; i++)
     random = (random * 10) + Math.floor((Math.random() * 10));
   return random;
 }

 function animateNewRandom() {
  $scope.finished = false;
  var delay = 1;
  var duration = 1000;
  var rep = 100;
  for (var i = 0; i < rep; i++) {
    timerCount++;
    $timeout(function() {
      $scope.random = newRandom(digitCount);
    }, delay)
    .finally(function(){
      timerCount--;
      $scope.finished = timerCount == 0;
      console.log(timerCount);
    });
    delay = delay + duration / (rep - i);
  }
}

function decrementDigit() {
  if(digitCount > 1) {
    digitCount--;
    animateNewRandom();
  }
}

function incrementDigit() {
  if(digitCount <= $scope.maxDigits) {
    digitCount++;
    animateNewRandom();
  }
}

$scope.$on('$viewContentLoaded', animateNewRandom());
$scope.animateNewRandom = animateNewRandom;
$scope.getDigitCount = function() {
  return digitCount;
}
$scope.incrementDigit = incrementDigit;
$scope.decrementDigit = decrementDigit;
});
