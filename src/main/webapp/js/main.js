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
         })
         .when("/course/:id", {
            templateUrl: "course_details.html",
            controller: "courseDetailsController"
         })
         .when("/upload/:id", {
            templateUrl: "upload.html",
            controller: "uploadController"
         })
         .when("/cards/:module_id", {
            templateUrl: "card.html",
            controller: "cardController"
         })
         .otherwise({
            templateUrl: "404.html"
         });
   });
})();
