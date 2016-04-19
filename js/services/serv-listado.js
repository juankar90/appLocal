var ls = angular.module('listadoService', []);


ls.factory('listadoFactory',function($http, $q, $filter){

    var peticion = {
      getAll: function (filtro) {

                var defered = $q.defer();
                var promise = defered.promise;

                var req = {
                    method: 'GET',
                    url: './php/listado-ajax.php',
                    responseType: 'json',
                    params: {
                          accion: "select",
                          buscar: "*",
                          tabla: 'persona'
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


        getMes: function (inicio, fin) {

                      var defered = $q.defer();
                      var promise = defered.promise;

                      var req = {
                          method: 'GET',
                          url: './php/listado-ajax.php',
                          responseType: 'json',
                          params: {
                                fechaInicio: inicio,
                                fechaFin: fin,

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
        comprobarMes: function (){
            var fecha = $filter('date')(new Date(), 'MM');
            var mes;
            switch (fecha) {
                case "01":
                    mes = "enero";
                    break;
                case "02":
                    mes = "febrero";
                    break;
                case "03":
                    mes = "marzo";
                    break;
                case "04":
                    mes = "abril";
                    break;
                case "05":
                    mes = "mayo";
                    break;
                case "06":
                    mes = "junio";
                    break;
                case "07":
                    mes = "julio";
                    break;
                case "08":
                    mes = "agosto";
                    break;
                case "09":
                    mes = "septiembre";
                    break;
                case "10":
                    mes = "octubre";
                    break;
                case "11":
                    mes = "noviembre";
                    break;
                case "12":
                    mes = "diciembre";
                    break;
              }

            return mes;

        },
        formatearFecha: function (fecha){
          var fechaFormateada = fecha.split('-')
          fechaFormateada = [fechaFormateada[2] + '-' +fechaFormateada[1]+ '-'+ fechaFormateada[0]]

          return fechaFormateada.toString();
        }
    }

    return peticion;
})
