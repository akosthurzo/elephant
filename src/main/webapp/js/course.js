(function () {
   var app = angular.module("elephantApp");

   var courseController = function ($scope, $http, $location, courseService) {
      $scope.course = {};

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

      $scope.deleteCourse = function (id) {
         courseService.deleteCourse(id)
            .then(function () {
               $scope.refreshCourses();
            });
      };

      $scope.goToDetails = function (course) {
         $location.path("/course/" + course.id);
      };

      $scope.refreshCourses();
   };

   app.controller("courseController", ['$scope', '$http', '$location', 'courseService', courseController]);
})();
