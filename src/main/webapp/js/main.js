(function () {
   var app = angular.module("elephantApp", ["ngRoute", "xeditable", 'ui.sortable']);

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
            controller: "cardController",
            css: "css/card.css"
         })
         .otherwise({
            templateUrl: "404.html"
         });
   });

   app.run(function (editableOptions) {
      editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
   });

   app.directive('head', ['$rootScope','$compile',
      function($rootScope, $compile){
         return {
            restrict: 'E',
            link: function(scope, elem){
               var html = '<link rel="stylesheet" ng-repeat="(routeCtrl, cssUrl) in routeStyles" ng-href="{{cssUrl}}" />';
               elem.append($compile(html)(scope));
               scope.routeStyles = {};
               $rootScope.$on('$routeChangeStart', function (e, next, current) {
                  if(current && current.$$route && current.$$route.css){
                     if(!angular.isArray(current.$$route.css)){
                        current.$$route.css = [current.$$route.css];
                     }
                     angular.forEach(current.$$route.css, function(sheet){
                        delete scope.routeStyles[sheet];
                     });
                  }
                  if(next && next.$$route && next.$$route.css){
                     if(!angular.isArray(next.$$route.css)){
                        next.$$route.css = [next.$$route.css];
                     }
                     angular.forEach(next.$$route.css, function(sheet){
                        scope.routeStyles[sheet] = sheet;
                     });
                  }
               });
            }
         };
      }
   ]);
})();
