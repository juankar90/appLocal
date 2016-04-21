var app = angular.module('multas', ['ngDialog']);

app.controller('multasControl', ['$scope', 'anadirPagoFactory', 'introduceMultaFactory', 'ngDialog', function ($scope, anadirPagoFactory, introduceMultaFactory, ngDialog){
  $scope.estiloBotones = {display: "none"}

  introduceMultaFactory.getPersonas()

  .then(function(ajax){

      $scope.personas = ajax.data.datos;
      console.log("la longitud es " + ajax.data.datos.length)

  })
  .catch(function (err) {
        if (err.status == 2) {
          $scope.nodatos = "no hay datos que mostrar";
        }

        console.log('Error ' + err.status + ' ' + err.statusText);
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
                $scope.estiloBuscarNombre = {display: "none"}


                $scope.estiloBotones = {display: "inline"}
                $scope.estiloTabla = {display: "inline"}
              }

              console.log('Error ' + err.status + ' ' + err.statusText);
    })

  }
  $scope.buscarOtro = function (){
    console.log("buyscar otro")
    $scope.estiloTabla = {display: "none"}
    $scope.estiloBotones = {display: "none"}
    $scope.estiloBuscarNombre = {display: "inline"}
  }

  $scope.eliminarElemento = function (a) {
    anadirPagoFactory.eliminarMulta(a)
        .then(function(ajax){
            console.log("se supone que se ha borrado")
            /*$scope.estiloBuscarNombre = {display: "none"}
            $scope.datos = ajax.data.datos;

            $scope.estiloBotones = {display: "inline"}
            $scope.estiloTabla = {display: "inline"}*/

        })
        .catch(function (err) {
              if (err.status == 2) {
                $scope.nodatos = "no hay datos que mostrar";
                /*$scope.estiloBuscarNombre = {display: "none"}


                $scope.estiloBotones = {display: "inline"}
                $scope.estiloTabla = {display: "inline"}*/
              }

              console.log('Error ' + err.status + ' ' + err.statusText);
    })
  }

  $scope.confirmarEliminar = function (){
    ngDialog.open({ template: 'views/confirmar.html' })
  }



}])
