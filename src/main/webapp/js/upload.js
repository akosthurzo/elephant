(function () {
   var app = angular.module("elephantApp");

   app.directive('fileChange', ['$parse', function ($parse) {
      return {
         require: 'ngModel',
         restrict: 'A',
         link: function ($scope, element, attrs, ngModel) {
            var attrHandler = $parse(attrs['fileChange']);

            var handler = function (e) {
               $scope.$apply(function () {
                  attrHandler($scope, {$event: e, files: e.target.files});
               });
            };

            element[0].addEventListener('change', handler, false);
         }
      }
   }]);

   var uploadController = function ($scope, $http, $routeParams, courseService) {
      $scope.course = {
         id: $routeParams.id
      };

      courseService.getCourse($scope.course.id)
         .then(function(course) {
            $scope.course = course;
         });

      $scope.module_file = [];

      $scope.handler = function (e, files) {
         var reader = new FileReader();

         reader.onload = function (e) {
            var content = reader.result;

            var contentLines = content.split('\n');

            $scope.module = {};

            $scope.module.name = contentLines.shift();

            $scope.module.cards = [];

            var pattern = /(.*)\t(.*)/;

            for (var i = 0; i < contentLines.length; i++) {
               var match = pattern.exec(contentLines[i]);

               var card = {
                  side1: match[1],
                  side2: match[2]
               };

               $scope.module.cards.push(card);
            }

            $scope.$apply();

            //uploadContent(contentLines);
         };
         reader.readAsText(files[0]);
      };

      $scope.addCards = function () {
         console.log("Uploading content...");

         $scope.module.card_links = [];

         for (var i = 0; i < $scope.module.cards.length; i++) {
            $http.post('/api/cards', $scope.module.cards[i])
               .then(function successCallback(response) {
                     console.log("SUCCESS! " + response);
                     $scope.module.card_links.push(response.data._links.self.href);
                  },
                  function errorCallback(response) {
                     console.log("ERROR! " + response);
                  });
         }
      };

      $scope.addModule = function () {
         $http.post('/api/modules', {name: $scope.module.name, cards: $scope.module.card_links})
            .then(function successCallback(response) {
                  console.log("SUCCESS! " + response);

                  var req = {
                     method: "PUT",
                     url: "/api/modules/1/cards",
                     headers: {
                        "Content-Type": "text/uri-list"
                     },
                     data: $scope.module.cards
                  }

                  //$http(req).then(function successCallback(response) {console.log("ADD OK!");}, function errorCallback(response) {console.log("ADD NOT OK!");});
               },
               function errorCallback(response) {
                  console.log("ERROR! " + response);
               });
      };
   };

   app.controller("uploadController", ['$scope', '$http', '$routeParams', 'courseService', uploadController]);
})();