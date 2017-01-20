(function () {
   var app = angular.module("elephantApp");

   var moduleController = function ($scope, $http, $routeParams, courseService) {
      $scope.module = {
         id: $routeParams.module_id
      };

      $scope.updateModuleName = function () {
         courseService.updateModule($scope.module)
            .then(function (module) {
               $scope.module.name = module.name;
            });
      };

      $scope.deleteCard = function (card) {
         console.log("removeCard:");
         console.dir(card);
         courseService.deleteCard($scope.module, card);
      };

      $scope.updateCard = function (card) {
         courseService.updateCard(card)
            .then(function (c) {
               $scope.module.cards[$scope.module.cards.indexOf(card)] = c;
            })
      };

      $scope.sortableOptions = {
         stop: function (e, ui) {
            courseService.updateCardOrder($scope.module);
         }

      };

      courseService.getModuleWithCards($scope.module.id)
         .then(function (module) {
            $scope.module = module;
         });
   };

   app.controller("moduleController", ['$scope', '$http', '$routeParams', 'courseService', moduleController]);
})();
