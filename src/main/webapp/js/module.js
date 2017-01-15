(function () {
   var app = angular.module("elephantApp");

   var courseDetailsController = function ($scope, $http, $routeParams, courseService) {
      $scope.course = {
         id: $routeParams.course_id
      };

      $scope.updateCourseName = function () {
         courseService.updateCourse($scope.course)
            .then(function (course) {
               $scope.course.name = course.name;
            });
      };

      $scope.deleteModule = function (module) {
         courseService.deleteModule($scope.course, module);
      };

      $scope.updateModule = function (module) {
         courseService.updateModule(module)
            .then(function (m) {
               $scope.course.modules[$scope.course.modules.indexOf(module)] = m;
            })
      };

      $scope.sortableOptions = {
         stop: function (e, ui) {
            courseService.updateModuleOrder($scope.course);
         }
      };

      courseService.getCourseWithModulesAndCards($scope.course.id)
         .then(function (course) {
            $scope.course = course;
         });
   };

   app.controller("courseDetailsController", ['$scope', '$http', '$routeParams', 'courseService', courseDetailsController]);
})();
