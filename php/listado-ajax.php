<?php
    include_once "./conexion.php";

    $filtrado = false;

    isset($_GET['fechaInicio']) ? $inicio = $_GET['fechaInicio'] : $filtrado = true;
    isset($_GET['fechaFin']) ? $final = $_GET['fechaFin'] : $filtrado = true;


    if ($filtrado){
        $consulta = "SELECT persona.nombre, mensualidad.pagado, mensualidad.fecha, persona.chocopuntos, mensualidad.importe from persona, mensualidad where persona.email = mensualidad.persona";
    }
    else if (!$filtrado){
        $consulta = "SELECT persona.nombre, mensualidad.pagado, mensualidad.fecha, persona.chocopuntos, mensualidad.importe from persona, mensualidad where persona.email = mensualidad.persona AND (mensualidad.fecha BETWEEN '$inicio' AND '$final')";

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
        while ($fila = $result->fetch_array()){
            //$fecha = date("d-m-Y", strtotime($fila[3]));
            $fecha = date_create($fila[2]);
            $fecha = date_format($fecha, 'd-m-Y');


            $status = 0;
            $obj = new stdClass();
            $obj->nombre = $fila[0];
            $obj->pagado = $fila[1];
            $obj->fecha = $fecha;
            $obj->chocopuntos = $fila[3];
            $obj->importe = $fila[4];

            array_push($array, $obj);

        }
    }


    $objfinal = new stdClass();
    $objfinal->status = $status;
    $objfinal->statusText = $mensaje;
    $objfinal->datos = $array;



    echo json_encode($objfinal);


?>
