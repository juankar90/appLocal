<?php
    include_once "./conexion.php";

    $validar = true;

    isset($_GET['email']) ? $email = $_GET['email'] : $validar = false;
    isset($_GET['pass']) ? $password = $_GET['pass'] : $validar = false;

    $array = array();

    $obj = new stdClass();
    $objfinal = new stdClass();



    if ($validar){
        $consulta = "SELECT password, nombre, tipo from persona where email = '$email'";

        $result = $conexion->query($consulta);

        $totalFilas = mysqli_num_rows($result);
        if ($totalFilas <1) {
              $status = 2; //status 2 es que está vacía la consulta
              $mensaje = "la consulta no ha devuelto ningun dato";
              $objfinal->estado = false;
        }
        else {
            $mensaje = "la peticion ajax se ha realizado correctamente";
            $status = 0;

            $fila = $result->fetch_array();

            $obj = new stdClass();

            if ($password ==  $fila[0]) {
                $objfinal->estado = true;
            }
            else {
                $obj->estado = false;
            }

            $obj->email = $email;
            $obj->password = $fila[0];
            $obj->nombre = $fila[1];
            $obj->tipo = $fila[2];

            array_push($array, $obj);
        }
    }
    else if (!$validar) {
      $status = 1;
      $mensaje = "Ha ocurrido un error no controlado";
      $objfinal->estado = false;
    }


    $objfinal->status = $status;
    $objfinal->statusText = $mensaje;
    $objfinal->datos = $array;


    echo json_encode($objfinal);


?>
