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

         deleteCourse: function (course) {
            return $http.delete('/api/courses/' + course.id)
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

         getCourseWithModules: function (id) {
            var def = $q.defer();

            this.getCourse(id)
               .then(function (course) {
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

         getCards: function (module) {
            var def = $q.defer();

            $http.get(module._links.cards.href)
               .then(function successCallback(response) {
                     console.log("getCourseWithModulesAndCards SUCCESS! " + response);

                     module.cards = response.data._embedded.cards;

                     def.resolve(module);
                  },
                  function errorCallback(response) {
                     console.log("getCourseWithModulesAndCards ERROR! " + response);
                     def.reject("getCourseWithModulesAndCards ERROR! " + response);
                  });

            return def.promise;
         },

         getCardsByModuleAndDueDateBetween: function (module, minDate, maxDate) {
            var def = $q.defer();

            $http.get("/api/cards/search/findByModuleAndDueDateBetween?module_id=" + module.id + "&min=" + minDate.format("YYYY-MM-DD") + "&max=" + maxDate.format("YYYY-MM-DD"))
               .then(function successCallback(response) {
                     console.log("getCardsByModuleAndDueDateBetween SUCCESS! " + response);

                     def.resolve(response.data);
                  },
                  function errorCallback(response) {
                     console.log("getCardsByModuleAndDueDateBetween ERROR! " + response);
                     def.reject("getCardsByModuleAndDueDateBetween ERROR! " + response);
                  });

            return def.promise;
         },

         getCardsByCourseAndDueDateBetween: function (course, minDate, maxDate) {
            var def = $q.defer();

            $http.get("/api/cards/search/findByCourseAndDueDateBetween?course_id=" + course.id + "&min=" + minDate.format("YYYY-MM-DD") + "&max=" + maxDate.format("YYYY-MM-DD"))
               .then(function successCallback(response) {
                     console.log("getCardsByCourseAndDueDateBetween SUCCESS! " + response);

                     def.resolve(response.data);
                  },
                  function errorCallback(response) {
                     console.log("getCardsByCourseAndDueDateBetween ERROR! " + response);
                     def.reject("getCardsByCourseAndDueDateBetween ERROR! " + response);
                  });

            return def.promise;
         },

         getCourseWithModulesAndCards: function (id) {
            var instance = this;

            var populateCards = function (course) {
               var promises = [];

               angular.forEach(course.modules, function (module) {
                  var promise = instance.getCards(module);

                  promises.push(promise);
               });

               return $q.all(promises);
            };

            var def = $q.defer();

            this.getCourseWithModules(id)
               .then(function (course) {
                  populateCards(course).then(
                     function (data) {
                        def.resolve(course);
                     }
                  );
               });

            return def.promise;
         },

         addCards: function (cards) {
            var addCard = function (card) {
               var def = $q.defer();

               $http.post('/api/cards', card)
                  .then(function successCallback(response) {
                        console.log("addCard SUCCESS! " + response);
                        //card_links.push(response.data._links.self.href);

                        def.resolve(response.data);
                     },
                     function errorCallback(response) {
                        console.log("addCard ERROR! " + response);
                     });

               return def.promise;
            };

            var promises = [];
            var card_links = [];

            angular.forEach(cards, function (card) {
               promises.push(addCard(card));
            });

            return $q.all(promises);
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
         },

         addModuleWithCards: function (course, module) {
            var updateModuleReferences = function (module, cards) {
               angular.forEach(cards, function (card) {
                  var req = {
                     method: "PUT",
                     url: '/api/cards/' + card.id + '/module',
                     headers: {
                        "Content-Type": "text/uri-list"
                     },
                     data: module._links.self.href
                  };

                  $http(req).then(function successCallback(response) {
                        console.log("updateModuleReferences SUCCESS! " + response);
                     },
                     function errorCallback(response) {
                        console.log("updateModuleReferences ERROR! " + response);
                     });
               });
            };

            var updateCourseReference = function (course, module) {
               var req = {
                  method: "PUT",
                  url: '/api/modules/' + module.id + '/course',
                  headers: {
                     "Content-Type": "text/uri-list"
                  },
                  data: course._links.self.href
               };

               $http(req).then(function successCallback(response) {
                     console.log("updateCourseReference SUCCESS! " + response);
                  },
                  function errorCallback(response) {
                     console.log("updateCourseReference ERROR! " + response);
                  });
            };

            this.addCards(module.cards)
               .then(function (cardArray) {
                  module.cards = cardArray;

                  var card_links = cardArray.map(function (card) {
                     return card._links.self.href;
                  });

                  $http.post('/api/modules', {name: module.name, cards: card_links})
                     .then(function successCallback(response) {
                           console.log("SUCCESS! " + response);

                           module = response.data;

                           var req = {
                              method: "POST",
                              url: '/api/courses/' + course.id + '/modules',
                              headers: {
                                 "Content-Type": "text/uri-list"
                              },
                              data: response.data._links.self.href
                           };

                           $http(req).then(
                              function successCallback(response) {
                                 console.log("ADD OK!");

                                 // update module back reference of the cards
                                 updateModuleReferences(module, cardArray);

                                 // update course back reference of the module
                                 updateCourseReference(course, module);
                              },
                              function errorCallback(response) {
                                 console.log("ADD NOT OK!");
                              });

                        },
                        function errorCallback(response) {
                           console.log("ERROR! " + response);
                        });
               });
         },

         getModule: function (module_id) {
            var def = $q.defer();

            $http.get('/api/modules/' + module_id)
               .then(function successCallback(response) {
                     console.log("getModule SUCCESS! " + response);
                     def.resolve(response.data);
                  },
                  function errorCallback(response) {
                     console.log("getModule ERROR! " + response);
                     def.reject("getModule ERROR! " + response);
                  });

            return def.promise;
         },

         getModuleWithCards: function (module_id) {
            var instance = this;

            var def = $q.defer();

            this.getModule(module_id)
               .then(function (module) {
                  instance.getCards(module);

                  def.resolve(module);
               });

            return def.promise;
         },

         updateModule: function (module) {
            var def = $q.defer();

            $http.put('/api/modules/' + module.id, module)
               .then(function successCallback(response) {
                     console.log("updateModule SUCCESS! " + response);
                     console.dir(response);
                     def.resolve(response.data);
                  },
                  function errorCallback(response) {
                     console.log("updateModule ERROR! " + response);
                     def.reject("updateModule ERROR! " + response);
                  });

            return def.promise;
         },

         updateCourse: function (course) {
            var def = $q.defer();

            $http.put('/api/courses/' + course.id, course)
               .then(function successCallback(response) {
                     console.log("updateCourse SUCCESS! " + response);
                     console.dir(response);
                     def.resolve(response.data);
                  },
                  function errorCallback(response) {
                     console.log("updateCourse ERROR! " + response);
                     def.reject("updateCourse ERROR! " + response);
                  });

            return def.promise;
         },

         updateCardOrder: function (module) {
            var cardUris = module.cards.map(function (c) {
               return c._links.self.href;
            });

            var req = {
               method: "PUT",
               url: '/api/modules/' + module.id,
               data: {id: module.id, name: module.name, cards: cardUris}
            };

            $http(req).then(function successCallback(response) {
                  console.log("updateCardOrder SUCCESS! " + response);
                  console.dir(response);
               },
               function errorCallback(response) {
                  console.log("updateCardOrder ERROR! ");
                  console.dir(response);
               });
         },

         updateModuleOrder: function (course) {
            var moduleUris = course.modules.map(function (m) {
               return m._links.self.href;
            });

            var req = {
               method: "PUT",
               url: '/api/courses/' + course.id,
               data: {id: course.id, name: course.name, modules: moduleUris}
            };

            $http(req).then(function successCallback(response) {
                  console.log("updateModuleOrder SUCCESS! " + response);
                  console.dir(response);
               },
               function errorCallback(response) {
                  console.log("updateModuleOrder ERROR! ");
                  console.dir(response);
               });
         },

         deleteCard: function (module, card) {
            module.cards.splice(module.cards.indexOf(card), 1);

            this.updateCardOrder(module);
         },

         deleteModule: function (course, module) {
            course.modules.splice(course.modules.indexOf(module), 1);

            this.updateModuleOrder(course);
         },

         updateCard: function (card) {
            var def = $q.defer();

            $http.put('/api/cards/' + card.id, card)
               .then(function successCallback(response) {
                     console.log("updateCard SUCCESS! " + response);
                     console.dir(response);
                     def.resolve(response.data);
                  },
                  function errorCallback(response) {
                     console.log("updateCard ERROR! " + response);
                     def.reject("updateCard ERROR! " + response);
                  });

            return def.promise;
         }
      };
   }]);
})();
