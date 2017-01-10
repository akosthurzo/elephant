(function () {
   var app = angular.module("elephantApp");

   app.factory("courseService", ['$http', '$q', function ($http, $q) {
      return {
         addCourse: function (course) {
            return $http.post('/api/courses', course)
               .then(function successCallback(response) {
                     console.log("addCourse SUCCESS! " + response);
                  },
                  function errorCallback(response) {
                     console.log("addCourse ERROR! " + response);
                  });
         },

         deleteCourse: function (id) {
            return $http.delete('/api/courses/' + id)
               .then(function successCallback(response) {
                     console.log("deleteCourse SUCCESS! " + response);
                  },
                  function errorCallback(response) {
                     console.log("deleteCourse ERROR! " + response);
                  });
         },

         getCourse: function (id) {
            var def = $q.defer();

            $http.get('/api/courses/' + id)
               .then(function successCallback(response) {
                     console.log("getCourse SUCCESS! " + response);
                     def.resolve(response.data);
                  },
                  function errorCallback(response) {
                     console.log("getCourse ERROR! " + response);
                     def.reject("getCourse ERROR! " + response);
                  });

            return def.promise;
         },

         getCourseWithModules : function (id) {
            var def = $q.defer();

            this.getCourse(id)
               .then(function(course) {
                  $http.get(course._links.modules.href)
                     .then(function successCallback(response) {
                           console.log("getCourseWithModules SUCCESS! " + response);

                           course.modules = response.data._embedded.modules;

                           def.resolve(course);
                        },
                        function errorCallback(response) {
                           console.log("getCourseWithModules ERROR! " + response);
                           def.reject("getCourseWithModules ERROR! " + response);
                        });
               });

            return def.promise;
         },

         getAllCourses: function () {
            var def = $q.defer();

            $http.get('/api/courses')
               .then(function successCallback(response) {
                     console.log("getAllCourses SUCCESS! " + response);
                     def.resolve(response.data._embedded.courses);
                  },
                  function errorCallback(response) {
                     console.log("getAllCourses ERROR! " + response);
                     def.reject("getAllCourses ERROR! " + response);
                  });

            return def.promise;
         }
      };
   }]);
})();
