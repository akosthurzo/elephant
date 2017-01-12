(function () {
   var app = angular.module("elephantApp");

   var cardController = function ($scope, $http, $routeParams, courseService) {
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
         console.log("updateCard:");
         console.dir(card);
      };

      courseService.getModuleWithCards($scope.module.id)
         .then(function (module) {
            $scope.module = module;
         });
   };

   app.controller("cardController", ['$scope', '$http', '$routeParams', 'courseService', cardController]);
})();
