<?php
    $conexion = new mysqli("localhost", "a1942982_userapp", "k47dmkYRBXgHXX", "a1942982_appbd");
    if ($conexion->connect_errno) {
        echo "Fallo al conectar a MySQL: (" . $conexion->connect_errno . ") " . $conexion->connect_error;
    }

 ?>
