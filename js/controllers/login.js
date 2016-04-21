var app = angular.module('login', ['ngCookies', 'loginAjaxService']);
app.controller('loginControl', ['$scope', '$rootScope', 'authFactory', 'loginAjaxFactory', function($scope, $rootScope, authFactory, loginAjaxFactory){



  var nombre = null;

  $scope.nombre = function (){
    return nombre;
  }

  $scope.comprobarUsuario = function(){

    var email = $scope.loginEmail
    var pass = $scope.loginPassword
    $scope.bienvenido = null;

    loginAjaxFactory.getEnviar(email, pass)
    .then(function(ajax){
      console.log(ajax.data.estado)
        if (ajax.data.estado)
            $rootScope.nombre = "Hola " +ajax.data.datos[0].nombre;
            console.log("soy un usuario " + ajax.data.datos[0].tipo)
            $scope.resultadoLogin = authFactory.login(ajax.data.estado, ajax.data.datos[0].email, ajax.data.datos[0].password, ajax.data.datos[0].tipo);
        $('.principal').css({
          "border": "10px double",
          "backgroundColor": "rgb(238, 238, 238)"
        })

    })
    .catch(function (err) {
          if (err.status == 2) {
            $scope.nodatos = "no hay datos que mostrar";
          }
          console.log(err.estado)
          $scope.resultadoLogin = authFactory.login(err.estado);
          console.log('Error ' + err.status + ' ' + err.statusText);
    })


  }

}]);
