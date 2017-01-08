(function () {
   var app = angular.module("elephantApp");

   var courseController = function ($scope, $http, courseService) {
      $scope.course = {};

        $scope.refreshCourses = function() {
            $http.get('/api/courses')
                 .then(function successCallback(response) {
                          console.log("SUCCESS! " + response);
                          $scope.courses = response.data._embedded.courses;
                       },
                       function errorCallback(response) {
                          console.log("ERROR! " + response);
                       });

            return null;
        };

        $scope.createCourse = function() {
            $http.post('/api/courses', $scope.course)
                 .then(function successCallback(response) {
                         console.log("SUCCESS! " + response);
                         $scope.refreshCourses();
                     },
                     function errorCallback(response) {
                         console.log("ERROR! " + response);
                     });
        };

        $scope.deleteCourse = function(id) {
            $http.delete('/api/courses/' + id)
                 .then(function successCallback(response) {
                          console.log("SUCCESS! " + response);
                          $scope.refreshCourses();
                       },
                       function errorCallback(response) {
                          console.log("ERROR! " + response);
                       });
        };

        $scope.refreshCourses();
    };

   app.controller("courseController", ['$scope', '$http', 'courseService', courseController]);
})();
