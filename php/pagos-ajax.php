<?php
    include_once "conexion.php";

    $insertar = true;

    isset($_GET['persona']) ? $persona = $_GET['persona'] : $insertar = false;
    isset($_GET['fecha']) ? $fecha = $_GET['fecha'] : $insertar = false;
    isset($_GET['importe']) ? $importe = $_GET['importe'] : $insertar = false;
    isset($_GET['concepto']) ? $concepto = $_GET['concepto'] : $insertar = false;


    $array = array();
    $status = 1; // status por defecto
    $mensaje = "Ha ocurrido un error no controlado"; // error por defecto, si no entrara nada

    $objfinal = new stdClass(); //creamos el objeto

    //  if ($insertar){
          /*if ($persona == 'undefined' || $fecha == 'undefined' || $importe = 'undefined' || $concepto = 'undefined' || $persona == null || $fecha == null || $importe = null || $concepto = null){
              $insertar = false;

          }*/
        if ($insertar){ //doble comprobación, por si llega algun dato undefined

            $status = 0;
            $mensaje = "Se ha insertado correctamente a la bd";

            //BUSCAMOS EL EMAIL DE LA PERSONA
            $consulta = "SELECT email FROM persona WHERE nombre = '$persona'";
            $resultado = $conexion->query($consulta);
            $datos = $resultado->fetch_array();
            $email = $datos['email'];

            if ($concepto == 'multa'){

                $consulta1 = "INSERT INTO `pago-multas` (`persona`, `importe`, `fecha`) VALUES ('$email', '$importe', '$fecha')";

            }else if ($concepto == 'pago mensual' ){

                $consulta1 = "INSERT INTO `mensualidad` (`persona`, `importe`, `fecha`, `pagado`) VALUES ('$email', '$importe', '$fecha', 'si')";

            }

            $result = $conexion->query($consulta1); // EJECUTA INSERTAR EL PAGO EN LA BD

            //SI ES MULTA AJUSTAMOS LOS CHOCOPUNTOS EN LA TABLA PERSONA
            if ($concepto == 'multa') {
                if ($result) {
                  //Miramos cuantos puntos tiene y cuanto dinero debe
                  $consultaSelect = "SELECT chocopuntos, debe from persona where email = '$email'";
                  $resultSelect  = $conexion->query($consultaSelect);
                  $mifila = $resultSelect->fetch_assoc();

                  $puntos = $importe/2; //puntos que vamos a saldar
                  $debe = $mifila['debe']; //dinero que debe
                  $debe = $debe - $importe; //importe actualizado restandole lo que paga
                  $puntos = ($mifila['chocopuntos']-$puntos); //estos son los puntos que tiene actualmente, tras pagar
                  $ConsultaAnadePuntos = "UPDATE `persona` SET `chocopuntos` = '$puntos',  `debe` = '$debe' where email = '$email'";
                  $conexion->query($ConsultaAnadePuntos);
                }
            }
            if (!$result) {
                $mensaje = "Ha habido un error";
                $status = 1;
            }

            $objfinal->datos = "correcto";
        }

  //  }


    $objfinal->status = $status;
    $objfinal->statusText = $mensaje;


    echo json_encode($objfinal);


?>
