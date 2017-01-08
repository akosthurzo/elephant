(function () {
   var app = angular.module("elephantApp");

   var courseDetailsController = function ($scope, $http, $routeParam, courseService) {
      $scope.course = {};


   };

   app.controller("courseDetailsController", ['$scope', '$http', '$routeParam', 'courseService', courseDetailsController]);
})();
