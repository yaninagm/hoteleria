/* Función que encapsula todo el desarrollo */
$(function() {
    /* Variable global con el nombre del proyecto. Método de proyección */
    var Hoteleria = {};
    
    /* Función .app, dentro de ésta van las funciones autoejecutables */
    (function(app) {
        app.init = function() {
            app.loader(); // Carga el loader
            app.bindings(); // Función donde se colocan las llamadas para el desarrollo
            var listado = app.crearlista(); // Fuerza la carga de lista en el index. Auto-ejecutable
        
        // Complemento del Loading. app.loader
            window.onload = function() {
                $.mobile.loading('hide');
            };
        };
        
        //Carga del Loading
        app.loader = function() {
            $(document).bind('mobileinit', function() {
                $.mobile.loader.prototype.options.text = "Cargando...";
                $.mobile.loader.prototype.options.textVisible = true;
                $.mobile.loader.prototype.options.theme = "a";
                $.mobile.loader.prototype.options.html = "";
            });
            $.mobile.loading('show', {
                text: 'Cargando...',
                textVisible: true,
                theme: 'a',
                html: ""
            });
        };

        // Dentro de la funcion Bindings van las llamadas a las funciones del desarrollo integro
        app.bindings = function() {
            //Cargo todos los eventos posibles. Importante.
            $(document).on("pagebeforeload pageload pageloadfailed pagebeforechange pagechange pagechangefailed pagebeforeshow pagebeforehide pageshow pagehide pagebeforecreate pagecreate pageinit pageremove updatelayout", function(e) {
                console.log(e.type);
            });
            
            // Objeto pagina #listado (Pagina 2)
            $("#listado").on("pagebeforeshow", function(e) {
                // Se utiliza para la captura de Id 
                var url = $(this).data("absUrl");
                var id_categoria = url.split("=")[1];
                if (id_categoria) {
                    app.crearListado(id_categoria);
                }
            });

            //Objeto pagina #fichas (pagina 3)
            $("#ficha").on("pagebeforeshow", function(e) {
                var url = $(this).data("absUrl");
                var id_hotel = url.split("=")[1];
                if (id_hotel){
                    app.crearFichas(id_hotel);
                }
            });
        };


        /******************************** Desarrollo de Funciones */
        //Lista del index
        app.crearlista = function() {
            $.getJSON("json/categorias.json", function(data) {
                var contenidoLista = '';
                $.each(data, function(index, item) {
                    // $('#lista').children().remove('li');
                    contenidoLista += '<li><a href="#listado?categoria=' + item.id + '"><h5>' + item.nombre + '</h5></a></li>';
                });

                $('#lista').html(contenidoLista).listview('refresh');

            });
        };

        //Lista de la pagina #listado
        app.crearListado = function(id_categoria) {
            $.post('json/hoteles.json', function(data) {
                var listado = '';
                var categoria = id_categoria;
                $.each(data, function(index, item) {
                    if (item.categoria == categoria) {
                        listado += '<li><a href="#ficha?id=' + item.id + '"><h5>' + item.nombre + '</h5></a></li>';                        
                    }
                });
                $('#listaHoteles').html(listado).listview('refresh');
            });
        };

        //Fichas de la pagina #fichas
        app.crearFichas = function(id_hotel) {
            $.getJSON('json/hoteles.json', function(data) {
                var cabecera = '';
                var info     = '';
                var hotel    = id_hotel;
                $.each(data, function(index, item) {
                    if (item.id == hotel) {
                        cabecera += '<img src="' + item.enlace_imagen + '" style="display: block; margin-left: auto; margin-right: auto;" />';
                        cabecera += '<h1 style="text-align: center">' + item.nombre + '</h2>';
                        if (item.info_resumen) {
                            info += '<div data-role="collapsible" id="info-resumen">';
                            info += '<h3>Resumen</h3>';
                            info += '<p>' + item.info_resumen + '</p>';
                            info += '</div>';
                        }
                        if (item.info_habitaciones) {
                            info += '<div data-role="collapsible" id="info-habitaciones">';
                            info += '<h3>Habitaciones</h3>';
                            info += '<p>' + item.info_habitaciones + '</p>';
                            info += '</div>';
                        }
                        if (item.info_restaurant) {
                            info += '<div data-role="collapsible" id="info-restaurant">';
                            info += '<h3>Restaurant</h3>';
                            info += '<p>' + item.info_restaurant + '</p>';
                            info += '</div>';
                        }
                    }
                });
        
                $('#cabeceraFicha').html(cabecera);
                if (info) {
                    $('#infoFicha').html(info).collapsibleset('refresh');
                }
            });
        };
        
        app.init();
    })(Hoteleria);
});
