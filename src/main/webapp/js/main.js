(function () {
   var app = angular.module("elephantApp", ["ngRoute"]);

   app.config(function ($routeProvider) {
      $routeProvider
         .when("/", {
            templateUrl: "course.html",
            controller: "courseController"
         })
         .when("/courses", {
            templateUrl: "course.html",
            controller: "courseController"
         });
   });
})();
