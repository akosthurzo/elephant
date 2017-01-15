(function () {
   var app = angular.module("elephantApp");

   var courseController = function ($scope, $http, $location, courseService) {
      $scope.course = {};

      $scope.updateCourseName = function (course) {
         courseService.updateCourse(course)
            .then(function (c) {
               $scope.courses[$scope.courses.indexOf(course)].name = c.name;
            });
      };

      $scope.deleteCourse = function (course) {
         courseService.deleteCourse(course);
         $scope.refreshCourses();
      };

      $scope.refreshCourses = function () {
         courseService.getAllCourses()
            .then(function (data) {
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

      $scope.refreshCourses();
   };

   app.controller("courseController", ['$scope', '$http', '$location', 'courseService', courseController]);
})();
