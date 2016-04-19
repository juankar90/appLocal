var ls = angular.module('loginService', []);
ls.factory("authFactory", ['$rootScope', '$location', 'loginAjaxFactory', function($rootScope, $location, loginAjaxFactory)
{
    return{
        login : function(estado, username, password, tipo){
            //var a = loginAjaxFactory.getEnviar(username, password)
            //creamos la cookie con el nombre que nos han pasado
            if (estado) {
              $rootScope.username = username,
              $rootScope.password = password;
              $rootScope.tipoUser = tipo;


              /*console.log("cookies en serv-login")
              console.log($cookies.username)
              console.log($cookies.password)
              console.log($cookies.tipoUser)*/
              //mandamos a la home
              $location.path("/");
              var msj = null;
              return msj
            }
            else if (!estado) {
              $location.path("/login");
              console.log("ha fallado el login");
              var msj = "<div class='alert alert-danger'>El usuario o la contraseña no son correctos</div>";
              return msj;
            }
        },
        logout : function(){
            //al hacer logout eliminamos la cookie con $cookieStore.remove
            $rootScope.username = null,
            $rootScope.password = null;
            $rootScope.tipoUser = null;
            $rootScope.nombre = null;
            console.log ("hacemos logout")
            //mandamos al login
            $location.path("/login");
        },
        checkStatus : function()
        {
            //creamos un array con las rutas que queremos controlar
            var rutasPrivadas = ["/"];
            var rutasAdmin = ["/introducir-pago"];

            if(this.in_array($location.path(),rutasPrivadas) && ($rootScope.username == "undefined" || $rootScope.username == null))
            {
                $location.path("/login");
            }
            if(this.in_array($location.path(),rutasAdmin) && ($rootScope.username == "undefined" || $rootScope.username == null))
            {
                $location.path("/login");
            }
            if(this.in_array($location.path(),rutasAdmin) && $rootScope.tipoUser != "admin")
            {
                $location.path("/restringido");
            }


            //en el caso de que intente acceder al login y ya haya iniciado sesión lo mandamos a la home
            if(this.in_array("/login",rutasPrivadas) && $rootScope.username != "undefined")
            {
                $location.path("/");
            }

        },
        in_array : function(needle, haystack)
        {
            var key = 0;
            for(key in haystack)
            {
                if(haystack[key] == needle)
                {
                    console.log (haystack[key])
                    return true;
                }
            }
            return false;
        }
    }
}]);
