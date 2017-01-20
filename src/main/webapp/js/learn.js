(function () {
   var app = angular.module("elephantApp");

   var learnController = function ($scope, $http, $routeParams, courseService) {
      var index = 0;

      courseService.getCardsByCourseAndDueDateBetween($routeParams.course_id, moment().subtract(10, "years"), moment())
         .then(function (cards) {
            shuffle(cards);

            $scope.cards = cards;
            $scope.currentCard = $scope.cards[index];
         });

      /*for(var i = 0; i < 10; i++) {
         var d = new Date();

         d.setDate(new Date().getDate() - 1);

         $scope.cards.push({
            side1: "side1 " + i,
            side2: "side2 " + i,
            interval: 1,
            eFactor: 2.5,
            repetitionCount: 0,
            dueDate: moment().subtract(1, 'day').startOf('day')
         });
      }*/

      $scope.showAnswer = function () {
         $scope.answerVisible = true;
      };

      $scope.processResult = function (q) {
         calculate($scope.cards[index], q);

         if ($scope.cards.length == 0) {
            $scope.message = "No more cards";

            return;
         }

         if (index >= $scope.cards.length - 1) {
            index = -1;
         }

         $scope.answerVisible = false;

         $scope.currentCard = $scope.cards[++index];
      };

      var calculate = function (card, q) {
         if (q < 3) {
            card.reiterate = true;
            console.log("reiterate:");
            console.dir(card);
            return; // repeat cards
         }

         if (!card.reiterate) {
            card.eFactor = card.eFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));

            if (card.eFactor < 1.3) {
               card.eFactor = 1.3;
            }
         }

         var interval; // in days

         card.repetitionCount++;

         if (card.reiterate || card.repetitionCount == 1) {
            interval = 1;
         } else if (card.repetitionCount == 2) {
            interval = 6;
         } else {
            interval = Math.round(card.interval * card.eFactor);
         }

         card.dueDate = moment().add(interval, 'days').startOf('day');
         card.interval = interval;

         console.log("updated card:");
         console.dir(card);

         courseService.updateCard(card);

         removeCardFromArray(card);

         console.log("cards left: " + $scope.cards.length);
      };

      var shuffle = function (a) {
         var j, x, i;
         for (i = a.length; i; i--) {
            j = Math.floor(Math.random() * i);
            x = a[i - 1];
            a[i - 1] = a[j];
            a[j] = x;
         }
      };

      var removeCardFromArray = function (card) {
         if ($scope.currentCard == card) {
            var i = $scope.cards.indexOf(card);

            $scope.cards.splice(i, 1);

            index--;
         }
      };
   };

   app.controller("learnController", ['$scope', '$http', '$routeParams', 'courseService', learnController]);
})();
