var ls = angular.module('anadirPagoService', []);

ls.factory('anadirPagoFactory',['$http', '$q', function($http, $q){
  var peticion = {
            recogerMultas: function (persona) {

                  var defered = $q.defer();
                  var promise = defered.promise;

                  var req = {
                      method: 'GET',
                      url: './php/listado-multas-ajax.php',
                      responseType: 'json',
                      params: {
                        persona: persona
                      }
                  };

                  $http(req).then(function (response) {
                      //console.log(response);
                      if (response.data.status == 0) {

                          defered.resolve(response);

                      } else {
                          defered.reject(response.data);
                      }
                  }, function (response) {
                      //console.log(response);
                      defered.reject(response);
                  });
                  return promise;

            },

            eliminarMulta: function (id, motivo) {

                  var defered = $q.defer();
                  var promise = defered.promise;

                  var req = {
                      method: 'GET',
                      url: './php/listado-multas-ajax.php',
                      responseType: 'json',
                      params: {
                        id: id,
                        motivo: motivo
                      }
                  };

                  $http(req).then(function (response) {
                      //console.log(response);
                      if (response.data.status == 0) {

                          defered.resolve(response);

                      } else {
                          defered.reject(response.data);
                      }
                  }, function (response) {
                      //console.log(response);
                      defered.reject(response);
                  });
                  return promise;

            }

      }

      return peticion;



}])
