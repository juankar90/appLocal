var ls = angular.module('anadirPagoService', []);


ls.factory('anadirPagoFactory',function($http, $q, $filter){

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

              introducirPago: function (nombre, fecha, importe, concepto) {

                    var defered = $q.defer();
                    var promise = defered.promise;

                    var req = {
                        method: 'GET',
                        url: './php/pagos-ajax.php',
                        responseType: 'json',
                        params: {
                            persona: nombre,
                            fecha: fecha,
                            importe: importe,
                            concepto: concepto
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
})
