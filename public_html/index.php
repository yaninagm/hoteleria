<html lang="es">
    <head>
        <meta charset="utf-8"/>
        <title>Hoteles de Mendoza</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        
        <link rel="stylesheet" href="css/libs/jquery-mobile/jquery.mobile-1.3.2.min.css" />
        
        <script src="js/libs/jquery/jquery.js"></script>
        <script src="js/libs/jquery-mobile/jquery.mobile-1.3.2.min.js"></script>
        
        <script src="js/funciones.js"></script>
    </head>
    
    <body>
        <?php
            include_once("conversorJson.php");
            
            obtener_categorias();
            obtener_hoteles();
        ?>

        <!-- Página de login-->
        <div data-role="page" id="login">
            <div data-role="header">
                <h1>Autenticación de Usuario</h1>
            </div>
            <div data-role="content">
                <form id="formulario" >
                    <label> Usuario </label>
                    <input type="text" id="nombredeusuario" name="nombredeusuario">
                    <label> Password </label>
                    <input type="password" id="clave" name="clave" >
                    <input type="submit" value="Login" id="botonLogin">
                </form>
            </div>
        </div>

    
        <!-- PÁGINA 1 -->
        <div data-role="page" id="index">
            <div data-role="header">
                <h1>Hoteles de Mendoza</h1>
            </div>
            <div data-role="content">
                <ul data-role="listview" id="lista" data-inset="true"></ul>
            </div>
            <div data-role="footer" data-position="fixed">
                <div data-role="navbar">
                    <ul>
                        <li><a href="#login">Login</a></li>
                        <li><a href="#">Map</a></li>
                    </ul>
                </div>
            </div>
        </div>
	
        <!-- PÁGINA 2: Listado de hoteles -->
	<div data-role="page" id="listado" data-add-back-btn="true">
            <div data-role="header">
                <a href="#index" data-role="button">Volver</a>
                <h1>Listado de hoteles</h1>
            </div>
            <div data-role="content">
                <ul data-role="listview" id="listaHoteles" data-inset="true"></ul>
            </div>
            <div data-role="footer" data-position="fixed">
                <h1>By Canizo, Manganiello, Morales</h1>
            </div>
        </div> 
        
	<!-- PÁGINA 3: Ficha de hoteles -->
	<div data-role="page" id="ficha" data-add-back-btn="true">
            <div data-role="header">
                <a href="#listado" data-role="button">Volver</a>
                <h1>Información del hotel</h1>
            </div>
            <div data-role="content" id="fichaHotel">
                <div id="cabeceraFicha">
                </div>
                <div data-role="collapsible-set" data-theme="c" data-content-theme="d" id="infoFicha">'
                </div>
            </div>
            <div data-role="footer" data-position="fixed">
                <h1>By Canizo, Manganiello, Morales</h1>
            </div>
        </div>
    </body>
</html>
