var app = angular.module('home', []);
app.controller('homeControl', function ($scope, listadoFactory, anadirPagoFactory){

          $scope.visualizarTabla = true; // esta variable oculta o visualiza la tabla de resultados (null para ocultar)


          //asigna el mes actual
          $scope.fecha = listadoFactory.comprobarMes()

          $scope.titulosListado = ["Nombre", "Importe", "Fecha", "Puntos", "Debe"]
          //console.log($scope.titulosListado.length)


          //FUNCIÓN QUE MUESTRA EL LISTADO PRINCIPAL Y ADEMÁS LO RESETEA SI LA LLAMAN DESPUES DE HABER MODIFICADO
          $scope.listadoNormal = function () {

            //comprueba si buscarNombre esta visible y lo oculta
            if (estado){
              $scope.styleBuscarNombre = {display: "none"}
              estado = false;
            }
            //comprueba si las fechas estan visibles y lo oculta
            if (visible){
              $scope.styleDatePicker = {display: "none"}
              visible = false;
            }
            $scope.visualizarTabla = true;

            $scope.titulosListado = ["Nombre", "Importe", "Fecha", "Puntos", "Debe"]
              //llamada a la función ajax que muestra el listado
              listadoFactory.getAll()
                  .then(function(ajax){

                      $scope.lista = ajax.data.datos;
                      //console.log(ajax.data)
                  })
                  .catch(function (err) {
                        if (err.status == 2) {
                          $scope.nodatos = "no hay datos que mostrar";
                        }

                        //console.log('Error ' + err.status + ' ' + err.statusText);
              })
          }
          $scope.listadoNormal() //ejecuta la función para mostrar automaticamente la tabla



          /*************************************
          BUSQUEDA POR FECHA INICIO Y FECHA FIN
          *************************************/

          //FUNCIÓN QUE PERMITE SELECCIONAR UNA FECHA DEL DATEPICKER
          $scope.fechas = function (){

              if ($scope.fechaInicio == 'undefined' || $scope.fechaInicio == null ||$scope.fechaFin == 'undefined' ||$scope.fechaFin == null) {
                  $scope.styleDatePicker = {display: "none"}
                  visible = false;
              }
              else {
                  var fecha1 = listadoFactory.formatearFecha($scope.fechaInicio)
                  var fecha2 = listadoFactory.formatearFecha($scope.fechaFin)


                  listadoFactory.getMes(fecha1, fecha2)
                    .then(function(ajax){
                        $scope.fecha = $scope.fechaInicio; //reescribe el mes
                        $scope.fechaFinn = "a "+$scope.fechaFin;
                        $scope.titulosListado = ["Nombre", "Importe", "Fecha", "Puntos", "Debe"];
                        $scope.lista = ajax.data.datos;
                        $scope.nodatos = null; //elimina el mensaje no hay datos

                    })
                    .catch(function (err) {
                          if (err.status == 2) {
                            $scope.lista = ""
                            $scope.titulosListado = ""
                            $scope.nodatos = "no hay datos que mostrar";
                          }

                          //console.log('Error ' + err.status + ' ' + err.statusText);
                    })

                    //OCULTAR EL DESPLEGABLE Y MOSTRAR LA TABLA
                    $scope.visualizarTabla = true;
                    $scope.styleDatePicker = {display: "none"}
                    visible = false;
                }
          }


          //MUESTRA Y OCULTA EL FORM DEL DATEPICKER
          var visible = false;
          $scope.styleDatePicker = {display: "none"}
          $scope.desplegaDatePicker =  function(){
                if (!visible){
                    $scope.styleDatePicker = {display: "block"}
                    $scope.visualizarTabla = null;
                    visible = true;
                    // /estado = false;

                } else if (visible){
                    $scope.styleDatePicker = {display: "none"}
                    visible = false;
                    $scope.visualizarTabla = true;
                }
                if (estado){
                    $scope.styleDatePicker = {display: "block"}
                    $scope.styleBuscarNombre = {display: "none"}
                    $scope.visualizarTabla = null;
                    visible = true;
                    estado = false;
                }
            }



          /******************
          BUSQUEDA POR NOMBRE
          ******************/
              //FORMULARIO OCULTO POR DEFECTO
              $scope.styleBuscarNombre = {
                  display: "none"
              }


            //MUESTRA Y OCULTA EL FORM DE BUSQUEDA POR NOMBRE
            var estado = false;
              $scope.mostrarBuscarNombre = function (){
                  if (!estado){
                      $scope.styleBuscarNombre = {display: "block"}
                      estado = true;
                      $scope.visualizarTabla = null;
                      //visible = false;

                  } else if (estado){
                      $scope.styleBuscarNombre = {display: "none"}
                      estado = false;
                      $scope.visualizarTabla = true;
                  }
                  if (visible){
                      $scope.styleBuscarNombre = {display: "block"}
                      $scope.styleDatePicker = {display: "none"}
                      estado = true;
                      visible = false;
                      $scope.visualizarTabla = null;
                  }

                  //ahora hace una llamada al ajax para rescatar los nombres
                  anadirPagoFactory.getPersonas()
                  .then(function(ajax){
                      $scope.personas = ajax.data.datos;

                  })
                  .catch(function (err) {
                        if (err.status == 2) {
                          $scope.nodatos = "no hay datos que mostrar";
                        }

                        console.log('Error ' + err.status + ' ' + err.statusText);
                  })

              }

              //LLAMADA AL AJAX PARA LA BUSQUEDA POR NOMRBE
              $scope.buscarPorNombre = function (){
                  listadoFactory.getNombre($scope.nombreBusq)
                  .then(function(ajax){
                      $scope.lista = ajax.data.datos;

                      $scope.titulosListado = ["Nombre", "Importe", "Fecha", "Debe"];

                      $scope.nodatos = null; //elimina el mensaje no hay datos

                  })
                  .catch(function (err) {
                        if (err.status == 2) {
                          $scope.lista = null
                          $scope.titulosListado = null
                          $scope.nodatos = "no hay datos que mostrar";
                        }

                        //console.log('Error ' + err.status + ' ' + err.statusText);
                  })
                  //OCULTAR EL DESPLEGABLE Y MOSTRAR LA TABLA
                  $scope.visualizarTabla = true;
                  $scope.styleBuscarNombre = {display: "none"}
                  estado = false;
              }
          /*+++++++++++++++++++++
          +++++++DATEPICKER ++++++
          ++++++++++++++++++++++*/

              var dias = [ "Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa" ];
              var minDias = [ "Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa" ]
              var mes = [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ]

              $('#fecha-inicio').datepicker({

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
                        $scope.fechaInicio = selectedDate;
                        $scope.$apply();
                  }

              });
              $('#fecha-fin').datepicker({
                  dateFormat: "dd-mm-yy",
                  dayNames: dias,
                  dayNamesMin: minDias,
                  monthNames: mes,
                  firstDay: 1,
                  //minDate: 0,

                  onClose: function (selectedDate) {
                      $("#fecha-inicio").datepicker("option", "maxDate", selectedDate);
                  },
                  onSelect: function(selectedDate) {
                        $scope.fechaFin = selectedDate;
                        $scope.$apply();
                  }

              });



});
