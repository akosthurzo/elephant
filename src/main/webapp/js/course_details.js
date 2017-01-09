(function () {
   var app = angular.module("elephantApp");

   var courseDetailsController = function ($scope, $http, $routeParams, courseService) {
      $scope.course = {
         id: $routeParams.id
      };

      courseService.getCourse($scope.course.id)
         .then(function(course) {
            $scope.course = course;
         });

      $scope.updateCourse = function() {

      };
   };

   app.controller("courseDetailsController", ['$scope', '$http', '$routeParams', 'courseService', courseDetailsController]);
})();
