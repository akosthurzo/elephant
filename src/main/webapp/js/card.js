(function () {
   var app = angular.module("elephantApp");

   var cardController = function ($scope, $http, $routeParams, courseService) {
      $scope.module = {
         id: $routeParams.module_id
      };
   };

   app.controller("cardController", ['$scope', '$http', '$routeParams', 'courseService', cardController]);
})();
