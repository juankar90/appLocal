<?php

    include_once "conexion.php";

    $insertar = true;

    isset($_GET['persona']) ? $persona = $_GET['persona'] : $insertar = false;
    isset($_GET['fecha']) ? $fecha = $_GET['fecha'] : $insertar = false;
    isset($_GET['puntos']) ? $puntos = $_GET['puntos'] : $insertar = false;
    isset($_GET['concepto']) ? $concepto = $_GET['concepto'] : $insertar = false;
    isset($_GET['masInfo']) ? $masInfo = $_GET['masInfo'] : $insertar = false;


    $consulta1 = "SELECT email FROM persona WHERE nombre = '$persona'";
    $resultado = $conexion->query($consulta1);
    $datos = $resultado->fetch_array();
    $email = $datos['email'];


    if ($insertar){
      if ($masInfo == 2){
          $consulta = "INSERT INTO `multas` (`persona`, `cantidad`, `concepto`, `fecha`) VALUES ('$email', '$puntos', '$concepto', '$fecha')";
          //echo "masInfo es 0";
      } else if ($masInfo!= 2){
          $consulta = "INSERT INTO `multas` (`persona`, `cantidad`, `mas_info`, `concepto`, `fecha`) VALUES ('$email', '$puntos', '$masInfo', '$concepto', '$fecha')";
          //echo "masInfo distinto de 0";
      }

    }
    $resultado = $conexion->query($consulta);
    if ($resultado){
      //si se ha insertado correctamente, ahora se suma a la persona
      $consultaSelect = "SELECT `chocopuntos`, `debe` FROM `persona` WHERE `email` = '$email'";
      $resultadoSelect = $conexion->query($consultaSelect);
      $fila = $resultadoSelect->fetch_assoc();

      $chocopuntos = $fila['chocopuntos'] + $puntos; //cantidad de puntos, ya actualizados
      $debe = $fila['debe'] + ($puntos*5/2); //cantidad dinero que se debe, ya actualizado
      $ConsultaAnadePuntos = "UPDATE `persona` SET `chocopuntos` = '$chocopuntos', `debe` = '$debe' WHERE `email` = '$email'";

      $r = $conexion->query($ConsultaAnadePuntos);
      if ($r){

          $status = 0;
          $mensaje = "Se ha insertado correctamente a la bd";
      }


    }
    else {
      echo "ha habido un fallo";
    }










        $objfinal = new stdClass();
        $objfinal->status = $status;
        $objfinal->statusText = $mensaje;
        //$objfinal->datos = "correcto";
        //$objfinal->consulta = $consulta1;



    echo json_encode($objfinal); 


?>
