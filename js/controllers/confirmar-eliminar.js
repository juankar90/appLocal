var app = angular.module('popUpEliminar', ['ui.bootstrap']);

app.controller('popUpEliminarControl', ['$scope', '$rootScope', 'anadirPagoFactory', '$uibModalInstance', function ($scope, $rootScope, anadirPagoFactory, $uibModalInstance){

  $scope.eliminarConfirmado = function () {

    anadirPagoFactory.eliminarElemento($rootScope.eid, $scope.motivo)
  }

  $scope.cerrarPopUp = function () {
      $uibModalInstance.close();

  }


}])
