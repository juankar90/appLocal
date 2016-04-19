var app = angular.module('home', []);
app.controller('homeControl', function ($scope, listadoFactory){
        //asigna el mes actual
        $scope.fecha = listadoFactory.comprobarMes()

        var titulosListado = ["Nombre", "Pagado", "Importe", "Fecha", "Puntos"]
        $scope.titulosListado = titulosListado;
        //llamada a la función ajax que muestra el listado
        listadoFactory.getAll()
          .then(function(ajax){

              $scope.lista = ajax.data.datos;
              //console.log(ajax.data)
          })
          .catch(function (err) {
                if (err.status == 2) {
                  $scope.nodatos = "no hay datos que mostrar";
                }

                //console.log('Error ' + err.status + ' ' + err.statusText);
          })


          //FUNCIÓN QUE PERMITE SELECCIONAR UNA FECHA DEL DATEPICKER
          $scope.fechas = function (){
              $('#seleccionar-mes').css("display", "none");
              var fecha1 = listadoFactory.formatearFecha($scope.fechaInicio)
              var fecha2 = listadoFactory.formatearFecha($scope.fechaFin)

              listadoFactory.getMes(fecha1, fecha2)
                .then(function(ajax){
                    $scope.fecha = $scope.fechaInicio; //reescribe el mes
                    $scope.fechaFinn = $scope.fechaFin
                    $scope.titulosListado = titulosListado;
                    $scope.lista = ajax.data.datos;
                    $scope.nodatos = ""; //elimina el mensaje no hay datos

                    //console.log($scope.fechaInicio)
                    //console.log($scope.fechaFin)
                    //console.log(ajax.data)
                })
                .catch(function (err) {
                      if (err.status == 2) {
                        $scope.lista = ""
                        $scope.titulosListado = ""
                        $scope.nodatos = "no hay datos que mostrar";
                      }

                      //console.log('Error ' + err.status + ' ' + err.statusText);
                })
          }




          //CAMBIA VISIBILIDAD DEL DATEPICKER
          $scope.desplegaDatePicker =  function(){

            if ($('#seleccionar-mes').css("display") == 'none') {
              $('#seleccionar-mes').css("display", "inline");
            }
            else {
              $('#seleccionar-mes').css("display", "none");
            }

          };


          /*+++++++++++++++++++++
          +++++++DATEPICKER ++++++
          ++++++++++++++++++++++*/

          var dias = [ "Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa" ];
          var minDias = [ "Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa" ]
          var mes = [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ]

          $('#fecha-inicio').datepicker({

              dateFormat: "dd-mm-yy",
              dayNames: dias,
              dayNamesMin: minDias,
              monthNames: mes,
              firstDay: 1, //pone el primer día de la semana lunes
              //minDate: 0, //fecha minima la de hoy

              onClose: function (selectedDate) {
                $("#fecha-fin").datepicker("option", "minDate", selectedDate);
              },
              onSelect: function(selectedDate) {
                    $scope.fechaInicio = selectedDate;
                    $scope.$apply();
              }

          });
          $('#fecha-fin').datepicker({
              dateFormat: "dd-mm-yy",
              dayNames: dias,
              dayNamesMin: minDias,
              monthNames: mes,
              firstDay: 1,
              //minDate: 0,

              onClose: function (selectedDate) {
                  $("#fecha-inicio").datepicker("option", "maxDate", selectedDate);
              },
              onSelect: function(selectedDate) {
                    $scope.fechaFin = selectedDate;
                    $scope.$apply();
              }

          });



});
