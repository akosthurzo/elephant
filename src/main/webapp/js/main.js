(function() {
    var app = angular.module("elephantModule", []);

    app.directive('fileChange',['$parse', function($parse) {
        return{
            require:'ngModel',
            restrict:'A',
            link:function($scope, element, attrs, ngModel) {
                var attrHandler = $parse(attrs['fileChange']);

                var handler = function(e) {
                    $scope.$apply(function() {
                        attrHandler($scope, {$event:e, files:e.target.files});
                    });
                };

                element[0].addEventListener('change', handler, false);
            }
        }
    }]);

    var uploadController = function($scope, $http) {
        $scope.MyFiles=[];

        $scope.handler = function(e, files) {
            var reader = new FileReader();
            reader.onload = function(e) {
                var content = reader.result;

                var contentLines = content.split('\n');

                console.log(contentLines);

                uploadContent(contentLines);
            };
            reader.readAsText(files[0]);
        }

        var uploadContent = function(lines) {
            $http.post('/api/modules', {name: lines[0]})
                 .then(function successCallback(response) {
                          console.log("SUCCESS! " + response);
                       },
                       function errorCallback(response) {
                          console.log("ERROR! " + response);
                       });
        };
    };

    app.controller("uploadController", ['$scope', '$http', uploadController]);
})();
