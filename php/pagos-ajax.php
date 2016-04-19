<?php
    include_once "conexion.php";

    $insertar = true;

    isset($_GET['persona']) ? $persona = $_GET['persona'] : $insertar = false;
    isset($_GET['fecha']) ? $fecha = $_GET['fecha'] : $insertar = false;
    isset($_GET['importe']) ? $importe = $_GET['importe'] : $insertar = false;
    isset($_GET['concepto']) ? $concepto = $_GET['concepto'] : $insertar = false;

    $array = array();
    $status = 1;
    $mensaje = "Ha ocurrido un error no controlado";

    //$persona = "Jose";

    if ($insertar){
        $status = 0;
        $mensaje = "Se ha insertado correctamente a la bd";

        $consulta = "SELECT email FROM persona WHERE nombre = '$persona'";
        $resultado = $conexion->query($consulta);
        $datos = $resultado->fetch_array();
        $email = $datos['email'];

        if ($concepto == 'multa'){
            $consulta1 = "INSERT INTO `pago-multas` (`persona`, `importe`, `fecha`) VALUES ('$email', '$importe', '$fecha');";
        }else if ($concepto == 'pago mensual' ){
            $consulta1 = "INSERT INTO `mensualidad` (`persona`, `importe`, `fecha`, `pagado`) VALUES ('$email', '$importe', '$fecha', 'si');";
        }

        $result = $conexion->query($consulta1);

        $objfinal = new stdClass();
        $objfinal->status = $status;
        $objfinal->statusText = $mensaje;
        $objfinal->datos = $result;
        $objfinal->consulta = $consulta1;

    }

    if (!$insertar) {
      $consulta = "SELECT nombre FROM persona";

      $result = $conexion->query($consulta);

      $totalFilas = mysqli_num_rows($result);
      if ($totalFilas <1) {
            $status = 2; //status 2 es que está vacía la consulta
            $mensaje = "la consulta a la bd no ha devuelto nada";
      }
      else {
          $mensaje = "la peticion ajax se ha realizado correctamente";
          $status = 0;
          while ($fila = $result->fetch_array()){
              array_push($array, $fila[0]);
          }
      }

      $objfinal = new stdClass();
      $objfinal->status = $status;
      $objfinal->statusText = $mensaje;
      $objfinal->datos = $array;
    }





    echo json_encode($objfinal);


?>
