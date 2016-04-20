var ls = angular.module('introducirMultaService', []);


ls.factory('introduceMultaFactory',['$http', '$q', '$filter', function($http, $q, $filter){
    var peticion = {
            getPersonas: function () {

                  var defered = $q.defer();
                  var promise = defered.promise;

                  var req = {
                      method: 'GET',
                      url: './php/pagos-ajax.php',
                      responseType: 'json'
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

            introduceMulta: function (persona, fecha, puntos, concepto, mas) {

                  var defered = $q.defer();
                  var promise = defered.promise;

                  var req = {
                      method: 'GET',
                      url: './php/poner-multa-ajax.php',
                      responseType: 'json',
                      params: {
                        persona: persona,
                        fecha: fecha,
                        puntos: puntos,
                        concepto: concepto,
                        masInfo: mas
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
