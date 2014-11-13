angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
})

.controller('RandomNumberCtrl', function($scope, $timeout){
  var digitCount = 1;
  
  var timerCount = 0;

  // Problems appear with more than 15 digits
  $scope.maxDigits = 15;

  function newRandom(digits) {
    digits = typeof digits !== 'undefined'? digits : 1;

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
      $scope.finished = timerCount === 0;
      //console.log(timerCount);
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
};
$scope.incrementDigit = incrementDigit;
$scope.decrementDigit = decrementDigit;
})

.controller('QuestionsCtrl', function($scope, questions){
  $scope.questions = questions;
  console.log($scope.questions);
})

.controller('AddQuestionCtrl', function($scope){
  $scope.question = {};
  $scope.addQuestion = function(){
    questions.push($scope.question);
  };
});
