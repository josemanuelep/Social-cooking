var instanciar = true;
var identificador = 0;
var div1;
var div2;
var br1;
var br2;
var br3;
var inputNombre;
var inputCantidad;
var porciones, horas, minutos;
var contador;
var list;
var files;
var reader;
var imagenes = [];
var receta = new Object();

console.log("Documento guardado");
console.log(document.getElementById("files"));
//document.getElementById("files").addEventListener("change", guardarImagenes);

function guardarDatos() {

    //trabajo bajo el supuesto de que los campos estan llenos
    var ingredientes = [];
    var img=[];
    var nombreReceta = document.getElementById('nombreReceta');
    var ingrediente = document.getElementById('nombre');
    var cantidadIngrediente = document.getElementById('cantidad');
    var idiomas = document.getElementById('listaIdiomas');
    var imagen = document.getElementById('files');
    var descripcion = document.getElementById('descripcionReceta');
    var pasoApaso = document.getElementById('pasosReceta');
    var categoria = document.getElementById('listaCategorias');
    horas = document.getElementById('hrs');
    minutos = document.getElementById('mnts');
    porciones = document.getElementById('porciones');
    ingredientes[0] = { ingrediente: "", cantidad: "" };
    ingredientes[0].ingrediente = document.getElementById('nombre').value;
    ingredientes[0].cantidad = document.getElementById('cantidad').value;
    var j = 0;
    var i;
    if (ingrediente != null)
    {
        for (i = 1; i < ingrediente.childNodes.length; i += 2) {
            ingredientes[j] = { ingrediente: "", cantidad: "" };
            ingredientes[j].ingrediente = ingrediente.childNodes[i].value;
            ingredientes[j].cantidad = cantidadIngrediente.childNodes[i].value;
            j++;
        }
    }
   
    for (var k = 0; k < imagen.files.length; k++) {
        ConvertirBase64(imagen.files[k]);
        img[k] = imagen.files[k];
    }


    receta =
        {
         'Nombre': nombreReceta.value,
        'correo_usu': localStorage.getItem("CorreoUsuario"),
        'ingrediente': ingredientes,
        'Idioma': idiomas.value,
        'Descripcion': descripcion.value,
        'PasoApaso': pasoApaso.value,
        'Categoria': categoria.value,
        'imagenes': imagenes,
        'tiempoPreparacion': horas.value + " " + minutos.value,
        'porciones': porciones.value
        };

   GuardarReceta(receta);

}

function GuardarReceta(receta) {

    receta = JSON.stringify(receta);
    $.ajax({
        url: "/api/receta",
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        data: receta,
        success: function (receta) {

            alert("Receta agregada satisfactoriamente", "Oprime ok para continuar");
            

        },
        error: function (request, message, error) {

            alert("Receta no agregada, intente de nuevo");
        }
    });
}

function ConvertirBase64(file) {

    var lectorImg = new FileReader();
    lectorImg.readAsDataURL(file);

    lectorImg.onload = function () {
        console.log(lectorImg.result);
        imagenes.push(lectorImg.result);


    };

    lectorImg.onerror = function (error) {
        console.log('Hubo un error: ', error);

    };
}

//Funcion para agregar campos de nombre, cantidad y unidades en la ventana modal.
function agregarCampos() {
 
  if(instanciar=== true)
  {
      div1 = document.createElement("DIV");
      div1.setAttribute("class", "form-group col-md-6");
      div1.setAttribute("id", "nombre");
      document.getElementById("Ingredientes").appendChild(div1);

      div2 = document.createElement("DIV");
      div2.setAttribute("class", "form-group col-md-3");
      div2.setAttribute("id", "cantidad");
      document.getElementById("Ingredientes").appendChild(div2);

      var unidades = document.createElement("div");
      unidades.setAttribute("class", "form-group col-md-3");
      unidades.setAttribute("id", "unidades");
      document.getElementById("Ingredientes").appendChild(unidades);
      instanciar = false;
    }

    //Agregar espacios entre cada campo.
    br1 = document.createElement("BR");
    document.getElementById("nombre").appendChild(br1);

    br2 = document.createElement("BR");
    document.getElementById("cantidad").appendChild(br2);

    br3 = document.createElement("BR");
    document.getElementById("unidades").appendChild(br3);



    //Agregar atributos a cada campo
    //Input nombre
    inputNombre = document.createElement("INPUT");
    inputNombre.setAttribute("type", "text");
    inputNombre.setAttribute("placeholder", "Nombre ingrediente");
    inputNombre.setAttribute("class", "form-control");
    inputNombre.setAttribute("required", "required");
    inputNombre.setAttribute("id", "campoNombre"+identificador);
    document.getElementById("nombre").appendChild(inputNombre);

    //Input cantidad
    inputCantidad = document.createElement("INPUT");
    inputCantidad.setAttribute("type", "number");
    inputCantidad.setAttribute("placeholder", "Cantidad");
    inputCantidad.setAttribute("class", "form-control");
    inputCantidad.setAttribute("required", "required");
    inputCantidad.setAttribute("id", "campoCantidad"+identificador);
    document.getElementById("cantidad").appendChild(inputCantidad);

    //Input unidad
    var optionUnidades = document.createElement("select");
    optionUnidades.setAttribute("class", "form-control");
    optionUnidades.setAttribute("required", "required");
    optionUnidades.setAttribute("id", "optionUnidades"+identificador);
    document.getElementById("unidades").appendChild(optionUnidades);

    var idoptUnidades = "optionUnidades" + identificador;
    var opts = document.getElementById(idoptUnidades);
    //Lenar los options
    addOptions(opts);
    //Se incrementa el numero de elementos creado
    identificador++;

}

//Funcion para eliminar campos de nombre y cantidad en la ventana modal. 
function eliminarCampos() {

  contador = document.getElementById("nombre").childElementCount;

  list = document.getElementById("nombre");
  list.removeChild(list.childNodes[contador-1]);

  list = document.getElementById("cantidad");
  list.removeChild(list.childNodes[contador-1]);

  list = document.getElementById("nombre");
  list.removeChild(list.childNodes[contador-2]);

  list = document.getElementById("cantidad");
  list.removeChild(list.childNodes[contador-2]);

  identificador--;
 
}

//Funcion para agregar opciones al option Select
function addOptions(optionSelect) {


    var unds = ['Lts', 'Mls', 'Kgs', 'Grs', 'Cdtas', 'Cdas', 'Tazas', 'Pizcas'];

    for (let i = 0; i < unds.length; i++) {

        if (i==0) {
            let opt = document.createElement("option");
            opt.appendChild(document.createTextNode("Unidades"));
            opt.innerHTML = ("Unidades");
            opt.setAttribute("selected","");
            opt.setAttribute("disabled","");     
            optionSelect.appendChild(opt);
        }
            let opt = document.createElement("option");
            opt.appendChild(document.createTextNode(unds[i]));
            opt.innerHTML = (unds[i]);
            optionSelect.appendChild(opt);

            }

     }
    
//agregar Imágenes
function guardarImagenes(e) {

    var files = e.target.files;

    if (window.FormData !== undefined) {

        var img = new FormData();

        for (var x = 0; x < files.length; x++) {
            console.log(files[x]);
            img.append("file" + x, files[x]);
        }

        $.ajax({
            type: "POST",
            url: '/api/FileUpload/',
            contentType: false,
            processData: false,
            data: img,
            success: function (result) {
                console.log("Se guardaron las imagenes");
            },
            error: function (xhr, status, p3, p4) {
                var err = "Error " + " " + status + " " + p3 + " " + p4;
                if (xhr.responseText && xhr.responseText[0] == "{")
                    err = JSON.parse(xhr.responseText).Message;
                console.log(err);
            }
        });
    } else {
        alert("This browser doesn't support HTML5 file uploads!");
    }
}
 

function limpiarBusqueda() {
    var item = document.getElementById('recetasxNombre');
    item.innerHTML = "";
}
  
function buscarxNombre()
{
    
    limpiarBusqueda();
    var search = document.getElementById('buscarReceta').value;

    //(String nombre, bool validar)
    $.getJSON('/api/receta?nombre=' + search + "&validar=" + true, function (data) {
        var ContendorRecetas = document.getElementById("recetasXNombre");
        if (data == "") {
            swal("No se encontró la receta :(", "Intenta con otra :)", "warning");
            

        }
        else { 
        $.each(data, function (recetaobtenidas, recActual) {
            {
               
                $("#recetasxNombre").append("\
                    <div class='col-md-3 col-sm-6 wow fadeInUp card ' > \
                        <div class='team-thumb'> \
                            <img src='images/chef1.jpg' class='img-responsive' alt='Team'> \
                                <div class='team-des'> \
                                    <h6>"+recActual.Nombre+"</h6> \
                                    <h4>"+ recActual.Categoria+"</h4> \
                                    <ul class='social-icon'> \
                                        <li><a href='#' class='fa fa-facebook'></a></li> \
                                        <li><button type='button' class='btn btn-primary' id='btnComentar' onclick=" + recActual.Id_receta +" data-toggle='modal' data-target='#exampleModalCenter6'>Ver Mas</button></li> \
                                    </ul> \
                               </div> \
                        </div> \
                </div> \
                   <div class='encima' aria-hidden='true'> \
                    <div class='modal fade' id ='exampleModalCenter6' tabindex='-1' role='dialog' aria-labelledby='exampleModalCenterTitle' aria-hidden='true'> \
                    <div class='modal-dialog modal-dialog-centered' role='document'> \
                        <div class='ventanaFormulario'> \
                            <div class='encabezadoFormulario'> \
                                <h5 class='tituloFormulario' id='titulo'>"+recActual.Nombre+"</h5> \
                            </div> \
                                <form method='dialog'> \
                                <div class='cuerpoFormulario'> \
                                    <div class='form-group'> \
                                        <label for='recipient-name' class='alinear'>Nombre de la Receta</label> \
                                        <input type='text' class='form-control' id='nombreReceta' required> \
                                        </div> \
                                        <!-- lista de Idiomas --> \
                                        <div class='form-group'> \
                                            <label for='exampleFormControlSelect1'>Idioma</label> \
                                            <select class='form-control' id='listaIdiomas' required> \
                                                <option value='' disabled selected>Selecciona un Idioma</option> \
                                                <option>Español</option> \
                                                <option>Inglés</option> \
                                                <option>Francés</option> \
                                                <option>Italiano</option> \
                                            </select> \
                                        </div> \
                                        <div class='form-group'> \
                                            <label for='exampleFormControlSelect1'>Categoría</label> \
                                            <select class='form-control' id='listaCategorias' required> \
                                                <option value='' disabled selected>Selecciona una Categoría</option> \
                                                <option>Vegetariana</option> \
                                                <option>Comida Rápida</option> \
                                                <option>Comida Italiana</option> \
                                                <option>Desayuno</option> \
                                            </select> \
                                        </div> \
                                        <!-- campos de nombre y cantidad de ingredientes --> \
                                        <div class='form-group'> \
                                            <label for='recipient-name' class='col-form-label'>Ingredientes</label> \
                                            <hr> \
                                        </div> \
                                            <!-- campo nombre de ingrediente --> \
                                        <div class='form-row' id='Ingredientes'> \
                                                <div class='margen col-md-6'> \
                                                    <label for='inputEmail4'>Nombre</label> \
                                                    <input type='text' class='form-control' id='nombreIngrediente' required> \
                                            </div> \
                                                    <!-- campo cantidad de ingrediente --> \
                                            <div class='margen col-md-6'> \
                                                        <label for='inputPassword4'>Cantidad</label> \
                                                        <input type='number' class='form-control' id='cantidadIngrediente' required> \
                                            </div> \
                                                    </div> \
                                                    <!-- botones agregar y eliminar campos de cantidad y nombre --> \
                                        <button onclick='agregarCampos()' class='btn btn-primary margenBoton'>Agregar</button> \
                                                    <button onclick='eliminarCampos()' class='btn btn-danger margenBoton'>Eliminar</button> \
                                                    <hr> \
                                                        <!-- campo de texto descripción--> \
                                        <div class='form-group'> \
                                                            <label for='exampleFormControlTextarea1' class='alinear'>Descripción</label> \
                                                            <textarea class='form-control' id='descripcionReceta' rows='3' required></textarea> \
                                                        </div> \
                                                        <!-- campo de texto paso a paso --> \
                                        <div class='form-group'> \
                                                            <label for='exampleFormControlTextarea1' class='alinear'>Paso a Paso</label> \
                                                            <textarea class='form-control' id='pasosReceta' rows='3' required></textarea> \
                                                        </div> \
                                                        <!-- obtener imagenes --> \
                                        <div class='form-group'> \
                                                            <label for='exampleFormControlFile1'>Imágenes</label> \
                                                            <input type='file' id='files' name='files[]' multiple><br> \
                                                                <output id='list'></output> \
                                        </div>\
                                    </div>\
                                                            <!-- Parte final del formulario --> \
                                    <div class='modal-footer' id='finalFormulario'> \
                                                                <button type='button' class='btn btn-danger' data-dismiss='modal' id='btnCerrarModal'>Cerrar</button> \
                                                                <button type='submit' class='btn btn-primary' id='btnAgregarReceta'>Agregar Receta</button> \
                                                            </div> \
                                </form> \
                            </div> \
                                                </div> \
                                            </div>\
                                        </div>");
                
                console.log("1" + recActual.Id_receta);
                console.log("2" + recActual.Categoria);
                console.log("3" + recActual.Descripcion);
                console.log("4" + recActual.Idioma);
                console.log("5" + recActual.Nombre);
                console.log("6" + recActual.correo_usu);
                console.log("7" + recActual.imagenes);
            }


            });

        }

    });
}

function buscarXCategoria(categoria) {
    limpiarBusqueda();
    $.getJSON('/api/receta?categoria=' + categoria, function (data) {
        var ContendorRecetas = document.getElementById("recetasXNombre");
        $.each(data, function (recetaobtenidas, recActual) {
            {

                $("#recetasxNombre").append("\
                    <div class='col-md-3 col-sm-6 wow fadeInUp card ' > \
                        <div class='team-thumb'> \
                            <img src='images/chef1.jpg' class='img-responsive' alt='Team'> \
                                <div class='team-des'> \
                                    <h6>"+ recActual.Nombre + "</h6> \
                                    <h4>"+ recActual.Categoria + "</h4> \
                                    <ul class='social-icon'> \
                                        <li><a href='#' class='fa fa-facebook'></a></li> \
                                        <li><button type='button' class='btn btn-primary' id='btnComentar' onclick=" + recActual.Id_receta + " data-toggle='modal' data-target='#exampleModalCenter2' >Ver Mas</button></li> \
                                    </ul> \
                               </div> \
                        </div> \
                </div>");
                console.log("1" + recActual.Id_receta);
                console.log("2" + recActual.Categoria);
                console.log("3" + recActual.Descripcion);
                console.log("4" + recActual.Idioma);
                console.log("5" + recActual.Nombre);
                console.log("6" + recActual.correo_usu);
                console.log("7" + recActual.imagenes);
            }


        });

    });
}


