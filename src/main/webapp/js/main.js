(function () {
   var app = angular.module("elephantApp", ["ngRoute"]);

   app.config(function ($routeProvider) {
      $routeProvider
         .when("/main", {
            templateUrl: "index.html"
         })
         .otherwise({redirectTo: "/main"});
   });
})();
