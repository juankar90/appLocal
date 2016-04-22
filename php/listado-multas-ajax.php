<?php
    include_once "./conexion.php";

    if (!isset($_GET['id'])){
        $recibido = true;

        isset($_GET['persona']) ? $persona = $_GET['persona'] : $recibido = false;



        $array = array();
        $status = 1;
        $mensaje = "Ha ocurrido un error no controlado";


        if ($recibido){
            $consultaSelect = "SELECT email FROM persona WHERE nombre = '$persona'";
            $resultSelect = $conexion->query($consultaSelect);
            $email = $resultSelect->fetch_assoc();
            $email = $email['email'];



            $consulta = "SELECT id,cantidad, fecha, concepto, mas_info FROM multas WHERE persona = '$email';";
            $result = $conexion->query($consulta);

            $totalFilas = mysqli_num_rows($result);
            if ($totalFilas <1) {
                $status = 2; //status 2 es que está vacía la consulta
                $mensaje = "la consulta a la bd no ha devuelto nada";
            }
            else {
              $mensaje = "la peticion ajax se ha realizado correctamente";
              while ($fila = $result->fetch_assoc()){
                  $fecha = date_create($fila['fecha']);
                  $fecha = date_format($fecha, 'd-m-Y');

                  $status = 0;

                  $obj = new stdClass(); //creamos el objeto
                  $obj->nombre = $persona;
                  $obj->cantidad = $fila['cantidad'];
                  $obj->fecha = $fecha;
                  $obj->concepto = $fila['concepto'];
                  $obj->masInfo = $fila['mas_info'];
                  $obj->id = $fila['id'];

                  array_push($array, $obj);

              }
            }
        }


        $objfinal = new stdClass();//creamos el objeto
        $objfinal->status = $status;
        $objfinal->statusText = $mensaje;
        $objfinal->datos = $array;



        echo json_encode($objfinal);

    }
    else {
      $id = $_GET['id'];
      isset($_GET['motivo']) ? $motivo = $_GET['motivo'] : $motivo = "no especificado";
      //lectura de los datos que vamos a borrar
      $select = "SELECT * FROM multas WHERE id='$id'";
      $result = $conexion->query($select);
      $fila = $result->fetch_assoc();
      $email = $fila['persona'];
      $puntos = $fila['cantidad'];
      $concepto = $fila['concepto'];
      $fecha = $fila['fecha'];

      //ahora lo insertamos en la tabla multas-delete, con la fecha del borrado
      $hoy = date("Y-m-d H:i:s");
      $insertar = "INSERT INTO `multas-delete` (`persona`, `cantidad`, `concepto`, `fecha`, `fecha_borrado`, `motivo_borrado`) VALUES ('$email', '$puntos', '$concepto', '$fecha', '$hoy', '$motivo')";

      $conexion->query($insertar);

      //procedemos al borrado en la tabla multas
      $borrar = "DELETE FROM multas WHERE id='$id'";
      $a = $conexion->query($borrar);

      //AHORA VAMOS A ACTUALIZAR LOS DATOS EN LA TABLA PERSONA
      if ($a) {
        //Miramos cuantos puntos tiene y cuanto dinero debe
        $consultaSelect = "SELECT chocopuntos, debe from persona where email = '$email'";
        $resultSelect  = $conexion->query($consultaSelect);
        $mifila = $resultSelect->fetch_assoc();

        $puntoss = $mifila['chocopuntos'] - $puntos; //los puntos eliminados los vamos a restar
        $debe = $mifila['debe']; //dinero que debe
        $debe = $debe - ($puntos*5/2); //importe actualizado restandole lo que paga

        $ConsultaAnadePuntos = "UPDATE `persona` SET `chocopuntos` = '$puntoss',  `debe` = '$debe' where email = '$email'";
        $conexion->query($ConsultaAnadePuntos);
      }

      $objfinal = new stdClass();//creamos el objeto
      $objfinal->status = 0;
      $objfinal->statusText = "se ha borrado correctamente";




      echo json_encode($objfinal);
    }

 ?>
