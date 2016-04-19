<?php
    $conexion = new mysqli("localhost", "userlocal", "12345Abc.", "mibd");
    if ($conexion->connect_errno) {
        echo "Fallo al conectar a MySQL: (" . $conexion->connect_errno . ") " . $conexion->connect_error;
    }

 ?>
