<?php

    function conectar_db() {
        $db_user = "mike";
        $db_pass = "";
        $db_host = "localhost";
        $db_database = "hoteleria";
        
        $conexion = @mysql_connect($db_host, $db_user, $db_pass)
                    or die ("Fallo en el establecimiento de la conexión.");
        $database = @mysql_select_db($db_database)
                    or die ("No se encuentra la base de datos.");
        
        return $conexion;
    }

?>