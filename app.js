var app = angular.module('miApp', ['ngRoute', 'routes','listadoService', 'home', 'pagos', 'anadirPagoService', 'loginService', 'login', 'loginAjaxService', 'introducirMultaService', 'ponerMulta', 'multas'])

app.controller('miAppControl', ['$scope', '$rootScope', 'authFactory', function($scope, $rootScope, authFactory){


    $scope.menu = ["<a href='#/'>HOME</a>","<a href='#/consultar-multas'>CONSULTAR MULTAS</a>","<a href='#/introducir-pago'>INTRODUCIR PAGO</a>","<a href='#/introducir-multa'>PONER MULTA</a>"]
    $scope.sesion = "<a href='#/' ng-click='logout()'>CERRAR SESION</a>"

    $scope.cerrarSesion = function (){
      authFactory.logout()
    }
}])

app.run(function($rootScope, authFactory)
{
    //al cambiar de rutas
    $rootScope.$on('$routeChangeStart', function($cookies)
    {
        //llamamos a checkStatus, el cual lo hemos definido en la factoria auth
        //la cuál hemos inyectado en la acción run de la aplicación
        authFactory.checkStatus();
        console.log ($rootScope.username)
        console.log ($rootScope.password)
        console.log ($rootScope.tipoUser)

    })
})
