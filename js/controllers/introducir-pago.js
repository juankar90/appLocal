var app = angular.module('pagos', ['ngSanitize']);

app.controller('pagosControl', function ($scope, anadirPagoFactory, listadoFactory, $sce){
    anadirPagoFactory.getPersonas()
    .then(function(ajax){

        $scope.personas = ajax.data.datos;
        console.log(ajax.data.datos)
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
        console.log(fechaPago)
        anadirPagoFactory.introducirPago($scope.pagosPersona, fechaPago, $scope.pagosImporte, $scope.pagosConcepto)
            .then(function(ajax){
                $scope.msjPagoCorrecto = "<div class='alert alert-success'> El pago se ha introducido correctamente</div>";
                console.log(ajax.data.datos)
                console.log(ajax.data.consulta)

                $scope.styleFormPagos = {
                  display: "none"
                }
                $scope.menuPagos = {
                  display: "inline"
                }

                /*var accion = "<h3>¿Qué quieres hacer ahora?</h3> <button type='button' class='btn btn-primary' ng-click='visualizarForm()'>Añadir otro pago</button>"
                accion =$sce.trustAsHtml(accion);
                $scope.elijeAccion = accion;*/
                /*setTimeout(function() {
                  $scope.msjPagoCorrecto=null;
                  $scope.$apply();
                }, 3000);*/



                console.log(ajax.data.status)
            })
            .catch(function (err) {
                  if (err.status == 2) {
                    $scope.nodatos = "no hay datos que mostrar";
                  }

                  console.log('Error ' + err.status + ' ' + err.statusText);
            })
    }

    $scope.visualizarForm = function (){
      $scope.styleFormPagos = {
        display: "inline"
      }
      $scope.menuPagos = {
        display: "none"
      }
      $scope.msjPagoCorrecto = null;
      $scope.pagosPersona = null;
      $scope.pagosFecha = null;
      $scope.pagosImporte = null;
      $scope.pagosConcepto = null;

      //$scope.elijeAccion = null;
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

});
