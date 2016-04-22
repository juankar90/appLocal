<?php
    $conexion = new mysqli("localhost", "miuserapp", "fpfXa75zT6WSSH7E", "miapp");
    if ($conexion->connect_errno) {
        echo "Fallo al conectar a MySQL: (" . $conexion->connect_errno . ") " . $conexion->connect_error;
    }

 ?>
