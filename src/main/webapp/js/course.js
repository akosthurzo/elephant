(function () {
   var app = angular.module("elephantApp");

   var courseController = function ($scope, $http, courseService) {
      $scope.course = {};

      $scope.refreshCourses = function () {
         courseService.getAllCourses()
            .then(function(data) {
               $scope.courses = data;
            });
      };

      $scope.addCourse = function () {
         courseService.addCourse($scope.course)
            .then(function () {
               $scope.refreshCourses();
            });

         $scope.course = {};
      };

      $scope.deleteCourse = function (id) {
         courseService.deleteCourse(id)
            .then(function () {
               $scope.refreshCourses();
            });
      };

      $scope.refreshCourses();
   };

   app.controller("courseController", ['$scope', '$http', 'courseService', courseController]);
})();
