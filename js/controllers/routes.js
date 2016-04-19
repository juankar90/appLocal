var app = angular.module('routes', ['ngRoute', 'home', 'pagos']);
app.config( function ($routeProvider){
  $routeProvider
      .when ("/", {
        controller: "homeControl",
        templateUrl: "views/home.html"
      })
      .when ("/introducir-pago", {
        controller: "pagosControl",
        templateUrl: "views/introducir-pago.html"
      })
      .when ("/login", {
        controller: "loginControl",
        templateUrl: "views/login.html"
      })
      .when ("/restringido", {
        //controller: "loginControl",
        templateUrl: "views/no-permisos.html"
      })


});
