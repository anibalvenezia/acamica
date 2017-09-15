// Tenemos varias funciones armadas que podemos usar:

// obtenerNoticias(): toma todas las noticias de la página
//
// ocultarNoticia(noticia): oculta la noticia pasada como parámetro
// mostrarNoticia(noticia): muestra la noticia pasada como parámetro
//
// contienePalabra(noticia, palabra): devuelve true si la noticia tiene la palabra
// pasada como parámetro
//
// recortarTexto(noticia, cantidadPalabras): recorta el texto de la noticia para
// que su largo sea cantidadPalabras


var noticias = obtenerNoticias();

// Esta la tienen que hacer, puede ser con while o for
function resaltarNoticiasQueContengan(palabra,color){
  var contador = 0;
  while(contador < noticias.length){
    noticiaActual = noticias[contador];
    if(contienePalabra(noticiaActual,palabra))
      cambiarColor(noticiaActual, color);
    contador++;
  }
}

// Si la noticia incluye la palabra, la ocultamos.
function ocultarNoticiasQueContengan(palabra){
  for(var contador = 0; contador<noticias.length; contador++){
    noticiaActual = noticias[contador];
    if(contienePalabra(noticiaActual,palabra))
      ocultarNoticia(noticiaActual);
  }
}

function recortarNoticias(cantPalabras){
  var aux='[...]';
  for(var contador = 0; contador<noticias.length; contador++){
    noticiaActual = noticias[contador];
    recortarTexto(noticiaActual,cantPalabras);
    //Agrego puntos suspensivos al final del preview de la nota.
    noticiaActual.querySelector("p").innerText += aux;
  }
}

//CONSIGNAS
//A) Ocultar noticias relacionadas a Google
ocultarNoticiasQueContengan("Google");
//B) Resaltar con color las noticias de Argentina.
resaltarNoticiasQueContengan("rgentin",'rgb(190, 219, 190)');
//C) Resaltar con otro color las noticias de robótica
resaltarNoticiasQueContengan("robot",'rgb(211, 204, 219)');
//D) Recortar las noticias para que no excedan las 20 palabras
recortarNoticias(20);
