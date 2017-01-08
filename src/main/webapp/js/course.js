(function () {
   var app = angular.module("elephantApp");

   var courseController = function ($scope, $http, courseService) {
      $scope.course = {};

      $scope.refreshCourses = function () {
         $http.get('/api/courses')
            .then(function successCallback(response) {
                  console.log("getAllCourses SUCCESS! " + response);
                  $scope.courses = response.data._embedded.courses;
               },
               function errorCallback(response) {
                  console.log("getAllCourses ERROR! " + response);
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
