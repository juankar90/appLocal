<?php

    include_once "conexion.php";

    $array = array();
    $objfinal = new stdClass(); //creamos el objeto
    $status = 1;
    $mensaje = "ha ocurrido un error desconocido";

    //CONSULTA
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

    $objfinal->datos = $array;
    $objfinal->status = $status;
    $objfinal->statusText = $mensaje;

    echo json_encode($objfinal);

?>
