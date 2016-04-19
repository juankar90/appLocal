var ls = angular.module('loginAjaxService', []);
ls.factory('loginAjaxFactory',function($http, $q, $filter){

    var peticion = {
      getEnviar: function (a, b) {
        console.log(a + b)

                var defered = $q.defer();
                var promise = defered.promise;

                var req = {
                    method: 'GET',
                    url: './php/login-ajax.php',
                    responseType: 'json',
                    params: {
                          email: a,
                          pass: b
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
                //if (promise != undefined) {
                  return promise;
                /*}
                else return "a"
*/

            }
          }
          return peticion;
        })
