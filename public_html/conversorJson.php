<?php

    include_once("conexion.php");
    
    function convertir_db_json($query, $json_path) {
        $conexion_db = conectar_db();
        
        $result = mysql_query($query);
        
        while ($rowEmp = mysql_fetch_array($result)){
            $data[] = $rowEmp;
        }
        
        $json_file = fopen($json_path, "w")
                     or die ("Problemas en la creación.");
        
        fputs($json_file, json_encode($data, JSON_UNESCAPED_UNICODE));
        
        mysql_close($conexion_db);
    }
    
    // Búsqueda de categorías en la base de datos
    function obtener_categorias() {
        $query = "SELECT * FROM categorias ORDER BY orden";
        $json_path = "json/categorias.json";
        
        convertir_db_json($query, $json_path);
    }
    
    // Búsqueda de hoteles en la base de datos
    function obtener_hoteles() {
        $query = "SELECT * FROM hoteles ORDER BY orden";
        $json_path = "json/hoteles.json";
        
        convertir_db_json($query, $json_path);
    }

?>
