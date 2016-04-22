var app = angular.module('ponerMulta', []);
app.controller('ponerMultaControl', ['$scope', 'listadoFactory', 'introduceMultaFactory', function ($scope, listadoFactory, introduceMultaFactory){
    $scope.msjCorrecto = null;
    $scope.posiblesConceptos = ['Limpieza', 'Otro'];

    $scope.menuPagos = { "display": "none" };

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

    $scope.introducirMulta = function () {
      var multaFecha = listadoFactory.formatearFecha($scope.multaFecha)
      if ($scope.multaMasInfo == 'undefined' || $scope.multaMasInfo == null){
        $scope.multaMasInfo = 2; //este valor hara que el servidor no lo tome como campo válido
      }
      introduceMultaFactory.introduceMulta($scope.multaPersona, multaFecha, $scope.multaImporte, $scope.multaConcepto, $scope.multaMasInfo)
      .then(function(ajax){
          $scope.msjCorrecto = "Se ha introducido correctamente";
          $scope.menuPagos = { "display": "inline" };
          $scope.styleFormMultas = { "display" : "none"};

          console.log(ajax.data.status)
      })
      .catch(function (err) {
            if (err.status == 2) {
              $scope.nodatos = "no hay datos que mostrar";
            }

            console.log('Error ' + err.status + ' ' + err.statusText);
      })
    }


    $scope.anadirOtraMulta = function () {
      $scope.styleFormMultas = { "display" : "inline"};
      $scope.msjCorrecto = null;
      $scope.menuPagos = { "display": "none" };
      $scope.multaPersona = null;
      $scope.multaFecha = null;
      $scope.multaImporte = null;
      $scope.multaConcepto = null;
      $scope.multaMasInfo = null;

    }



    /*+++++++++++++++++++++
    +++++++DATEPICKER ++++++
    ++++++++++++++++++++++*/

    var dias = [ "Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa" ];
    var minDias = [ "Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa" ]
    var mes = [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ]

    $('#multaFecha').datepicker({

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
              $scope.multaFecha = selectedDate;
              $scope.$apply();
        }
      })


}])
