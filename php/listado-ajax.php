<?php
    include_once "./conexion.php";

    $filtrado = true;
    $filtroNombre = true;


    isset($_GET['fechaInicio']) ? $inicio = $_GET['fechaInicio'] : $filtrado = false;
    isset($_GET['fechaFin']) ? $final = $_GET['fechaFin'] : $filtrado = false;

    isset($_GET['filtroNombre']) ? $nombre = $_GET['filtroNombre'] : $filtroNombre = false;



    if (!$filtroNombre){
      if (!$filtrado){
          $consulta = "SELECT persona.nombre, mensualidad.pagado, mensualidad.fecha, persona.chocopuntos, mensualidad.importe from persona, mensualidad where persona.email = mensualidad.persona";
      }
      else if ($filtrado){
          $consulta = "SELECT persona.nombre, mensualidad.pagado, mensualidad.fecha, persona.chocopuntos, mensualidad.importe from persona, mensualidad where persona.email = mensualidad.persona AND (mensualidad.fecha BETWEEN '$inicio' AND '$final')";

      }
    }

    if ($filtroNombre) {
      $consulta1 = "SELECT email FROM persona WHERE nombre = '$nombre'";
      $resultado1 = $conexion->query($consulta1);
      $datos = $resultado1->fetch_array();
      $email = $datos['email'];


      $consulta = "SELECT persona.nombre, mensualidad.pagado, mensualidad.fecha, mensualidad.importe from persona, mensualidad where persona.email = '$email'";
    }



    $result = $conexion->query($consulta);
    $array = array();
    $status = 1;
    $mensaje = "Ha ocurrido un error no controlado";

    $totalFilas = mysqli_num_rows($result);
    if ($totalFilas <1) {
          $status = 2; //status 2 es que está vacía la consulta
          $mensaje = "la consulta a la bd no ha devuelto nada";
    }
    else {
        $mensaje = "la peticion ajax se ha realizado correctamente";
        while ($fila = $result->fetch_assoc()){
            //$fecha = date("d-m-Y", strtotime($fila[3]));
            $fecha = date_create($fila['fecha']);
            $fecha = date_format($fecha, 'd-m-Y');


            $status = 0;
            $obj = new stdClass();
            $obj->nombre = $fila['nombre'];
            $obj->pagado = $fila['pagado'];
            $obj->fecha = $fecha;

            $obj->importe = $fila['importe'];
            if (!$filtroNombre){
              $obj->chocopuntos = $fila['chocopuntos'];
            }

            array_push($array, $obj);

        }
    }


    $objfinal = new stdClass();
    $objfinal->status = $status;
    $objfinal->statusText = $mensaje;
    $objfinal->datos = $array;



    echo json_encode($objfinal);


?>
