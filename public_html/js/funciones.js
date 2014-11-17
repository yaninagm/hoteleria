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
            $(document).on("pagecontainerbeforeload pagecontainerload pagecontainerloadfailed pagebeforechange pagechange pagecontainerchangefailed pagecontainerbeforeshow pagebeforehide pagecontainershow pagecontainerhide pagebeforecreate pagecreate pageinit pageremove updatelayout", function(e) {
                console.log(e.type);
            });
            
            // Manejo de parámetros en página #listado (listado de hoteles)
            $.mobile.paramsHandler.addPage(
                'listado',               // ID de la página
                ['categoria'],           // Parámetros obligatorios
                [],                      // Parámetros opcionales

                // Función callback a ejecutar antes de mostrar la página
                function (urlParams) {
                    app.crearListado(urlParams.categoria);
                }
            );

            // Manejo de parámetros en página #ficha (ficha de hotel)
            $.mobile.paramsHandler.addPage(
                'ficha',                 // ID de la página
                ['id'],                  // Parámetros obligatorios
                [],                      // Parámetros opcionales

                // Función callback a ejecutar antes de mostrar la página
                function (urlParams) {
                    app.crearFichas(urlParams.id);
                }
            );

            // Inicialización de paramsHandler
            $.mobile.paramsHandler.init();
        };


        $('#formulario').submit(function() {
            // recolecta los valores que inserto el usuario
            var datosUsuario = $("#nombredeusuario").val();
            var datosPassword = $("#clave").val();

            archivoValidacion = "servidorValidacion.php?jsoncallback=?";

            $.getJSON(archivoValidacion, {usuario: datosUsuario,
                                          password: datosPassword})
                .done(function(respuestaServer) {
                    if (respuestaServer.validacion == "ok") {
                        /// si la validacion es correcta, muestra la pantalla "home"
                        swal({
                          title: respuestaServer.mensaje,
                          text: "Generado en: " + respuestaServer.hora,
                          type: "success",
                          allowOutsideClick: true
                        });
                        
                        $.mobile.changePage("#index");
                    } else {
                        /// ejecutar una conducta cuando la validacion falla
                        swal({
                          title: respuestaServer.mensaje,
                          text: "Generado en: " + respuestaServer.hora,
                          type: "error",
                          allowOutsideClick: true
                        });
                    }
                });
            return false;
        });


        /******************************** Desarrollo de Funciones */
        //Lista del index
        app.crearlista = function() {
            $.getJSON("json/categorias.json", function(data) {
                var contenidoLista = '';
                var cantidadHoteles = 0;
                $.each(data, function(index, item) {
                    $.ajax({
                        url: 'json/hoteles.json',
                        async: false,
                        dataType: 'json',
                        success: function(data) {
                            cantidadHoteles = 0;
                            $.each(data, function(index, hotel) {
                                if (hotel.categoria == item.id) {
                                    cantidadHoteles = cantidadHoteles + 1;
                                }
                            });

                        }
                    });

                    contenidoLista += '<li class="ui-li-has-count ui-li-has-thumb">' +
                                      '<a href="#listado?categoria=' + item.id + '">' +
                                      '<div class="ui-li-thumb">' +
                                      '<img src="' + item.enlace_imagen + '" class="thumb" alt="' + item.nombre + '">' +
                                      '</div>' +
                                      '<h5>' + item.nombre + '</h5>' +
                                      '<span class="ui-li-count ui-body-inherit">' + cantidadHoteles + '</span>' +
                                      '</a></li>';
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
                        cabecera += '<div style="width: 100%; text-align: center;">'
                        cabecera += '<img src="' + item.enlace_imagen + '" style="max-width: 100%;" />';
                        cabecera += '</div>'
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
