var app = angular.module('multas', ['ngAnimate', 'ui.bootstrap']);

app.controller('multasControl', ['$scope', '$rootScope', 'anadirPagoFactory', 'introduceMultaFactory', '$uibModal','$log', function ($scope, $rootScope, anadirPagoFactory, introduceMultaFactory, $uibModal, $log){

  $scope.estiloBotones = {display: "none"};
  $scope.estiloBotonVolverAtras = {display: "none"}

  introduceMultaFactory.getPersonas()
  .then(function(ajax){
      $scope.personas = ajax.data.datos;
      //console.log("la longitud es " + ajax.data.datos.length)
  })
  .catch(function (err) {
        if (err.status == 2) {
          $scope.nodatos = "No hay datos que mostrar";
        }

        //console.log('Error ' + err.status + ' ' + err.statusText);
  })


  $scope.buscarDatos = function () {
    $scope.nodatos = null;
    $scope.titulosListado = ["Persona", "Cantidad", "Fecha", "Concepto", "Mas info", "Acción"]

    anadirPagoFactory.recogerMultas($scope.nombreBuscarMulta)
        .then(function(ajax){
            $scope.estiloBuscarNombre = {display: "none"}
            $scope.datos = ajax.data.datos;

            $scope.estiloBotones = {display: "inline"}
            $scope.estiloTabla = {display: "inline"}

        })
        .catch(function (err) {
              if (err.status == 2) {
                $scope.nodatos = "no hay datos que mostrar";
                $scope.estiloTabla = {display: "none"}
                $scope.estiloBuscarNombre = {display: "none"}


                $scope.estiloBotones = {display: "inline"}
                //$scope.estiloTabla = {display: "inline"}
              }

              console.log('Error ' + err.status + ' ' + err.statusText);
    })

  }
  $scope.buscarOtro = function (){
      console.log("buyscar otro")
      $scope.estiloTabla = {display: "none"}
      $scope.estiloBotones = {display: "none"}
      $scope.estiloBuscarNombre = {display: "inline"}
      $scope.nodatos = null;
      $scope.msjBorradoCorrecto = null;
      $scope.estiloBotonVolverAtras = {display: "none"}
  }


  $scope.msjBorradoCorrecto= null;
  $scope.confirmarEliminar = function (id) {

    var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'views/confirmar.html',
        controller:function($uibModalInstance, $scope, $rootScope, anadirPagoFactory){
              $scope.cancelar = function () {
                  $uibModalInstance.dismiss();
              };
              $scope.eliminarConfirmado = function () {
                  $rootScope.despuesDelBorrado()
                  anadirPagoFactory.eliminarMulta(id, $scope.motivo)
                  $uibModalInstance.dismiss();


              }
         },
         size: 'sm',

    });


  };

  $rootScope.despuesDelBorrado = function () {
    $scope.msjBorradoCorrecto = "Se ha eliminado correctamente";
    $scope.estiloTabla = {display: "none"}
    $scope.estiloBotones = {display: "none"}
    $scope.estiloBotonVolverAtras = {display: "inline"}
    console.log("Esta borrado")
  }

  $scope.volverAtras = function () {
      $scope.estiloTabla = {display: "none"}
      $scope.estiloBotones = {display: "none"}
      $scope.estiloBuscarNombre = {display: "inline"}
      $scope.nodatos = null;

  }


}])
