var app = angular.module('pagos', ['ngSanitize']);

app.controller('pagosControl',['$scope', 'anadirPagoFactory', 'listadoFactory', 'introduceMultaFactory', '$sce' ,function ($scope, anadirPagoFactory, listadoFactory, introduceMultaFactory, $sce){

    introduceMultaFactory.getPersonas()
    .then(function(ajax){

        $scope.personas = ajax.data.datos;
        //console.log(ajax.data.datos)
    })
    .catch(function (err) {
          if (err.status == 2) {
            $scope.nodatos = "no hay datos que mostrar";
          }

          console.log('Error ' + err.status + ' ' + err.statusText);
    })
    $scope.menuPagos = {
      display: "none"
    }

    $scope.tiposConcepto = ['pago mensual', 'multa'];
    $scope.funcionAjaxPago = function(){

        var fechaPago = listadoFactory.formatearFecha($scope.pagosFecha)
        //console.log(fechaPago)

        anadirPagoFactory.introducirPago($scope.pagosPersona, fechaPago, $scope.pagosImporte, $scope.pagosConcepto)

            .then(function(ajax){
                $scope.msjPagoCorrecto = "<div class='alert alert-success'> El pago se ha introducido correctamente</div>";
                //console.log("el concepto es : " +$scope.concepto)
                //console.log("especificaciones: " + $scope.masInfo)
                $scope.styleFormPagos = {
                  display: "none"
                }
                $scope.menuPagos = {
                  display: "inline"
                }


                //console.log(ajax.data.status)
            })
            .catch(function (err) {
                  if (err.status == 2) {
                    $scope.nodatos = "no hay datos que mostrar";
                  }
                  $scope.msjPagoIncorrecto = "<div class='alert alert-success'> El pago se ha introducido correctamente</div>";

                  console.log('Error ' + err.status + ' ' + err.statusText);
            })
            //console.log($scope.pagosPersona + " " + fechaPago + " " + $scope.pagosImporte + " " + $scope.pagosConcepto);
    }

    $scope.visualizarForm = function (){
      $scope.styleFormPagos = {
        display: "inline"
      }
      $scope.menuPagos = {
        display: "none"
      }
      $scope.msjPagoCorrecto = null;
      $scope.msjPagoIncorrecto = null;
      $scope.pagosPersona = null;
      $scope.pagosFecha = null;
      $scope.pagosImporte = null;
      $scope.pagosConcepto = null;
      $scope.concepto = null;
      $scope.masInfo = null;

    }

    /*+++++++++++++++++++++
    +++++++DATEPICKER ++++++
    ++++++++++++++++++++++*/

    var dias = [ "Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa" ];
    var minDias = [ "Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa" ]
    var mes = [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ]

    $('#pagosFecha').datepicker({

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
              $scope.pagosFecha = selectedDate;
              $scope.$apply();
        }

    });

}]);
