var nombreColores = ['White', 'LightYellow',
  'LemonChiffon', 'LightGoldenrodYellow', 'PapayaWhip', 'Moccasin', 'PeachPuff', 'PaleGoldenrod', 'Bisque', 'NavajoWhite', 'Wheat', 'BurlyWood', 'Tan',
  'Khaki', 'Yellow', 'Gold', 'Orange', 'DarkOrange', 'OrangeRed', 'Tomato', 'Coral', 'DarkSalmon', 'LightSalmon', 'LightCoral', 'Salmon', 'PaleVioletRed',
  'Pink', 'LightPink', 'HotPink', 'DeepPink', 'MediumVioletRed', 'Crimson', 'Red', 'FireBrick', 'DarkRed', 'Maroon',
  'Brown', 'Sienna', 'SaddleBrown', 'IndianRed', 'RosyBrown',
  'SandyBrown', 'Goldenrod', 'DarkGoldenrod', 'Peru',
  'Chocolate', 'DarkKhaki', 'DarkSeaGreen', 'MediumAquaMarine',
  'MediumSeaGreen', 'SeaGreen', 'ForestGreen', 'Green', 'DarkGreen', 'OliveDrab', 'Olive', 'DarkOliveGreen', 'YellowGreen', 'LawnGreen',
  'Chartreuse', 'GreenYellow', 'Lime', 'SpringGreen', 'LimeGreen',
  'LightGreen', 'PaleGreen', 'PaleTurquoise',
  'AquaMarine', 'Cyan', 'Turquoise', 'MediumTurquoise', 'DarkTurquoise', 'DeepSkyBlue',
  'LightSeaGreen', 'CadetBlue', 'DarkCyan', 'Teal', 'Steelblue', 'LightSteelBlue', 'Honeydew', 'LightCyan',
  'PowderBlue', 'LightBlue', 'SkyBlue', 'LightSkyBlue',
  'DodgerBlue', 'CornflowerBlue', 'RoyalBlue', 'SlateBlue',
  'MediumSlateBlue', 'DarkSlateBlue', 'Indigo', 'Purple', 'DarkMagenta', 'Blue',
  'MediumBlue', 'DarkBlue', 'Navy', 'Thistle',
  'Plum', 'Violet', 'Orchid', 'DarkOrchid', 'Fuchsia', 'Magenta', 'MediumOrchid',
  'BlueViolet', 'DarkViolet', 'DarkOrchid',
  'MediumPurple', 'Lavender', 'Gainsboro', 'LightGray', 'Silver', 'DarkGray', 'Gray',
  'DimGray', 'LightSlateGray', 'DarkSlateGray', 'Black'
];

//Variables para la opcion 'deshacer'
var $deshacerPixel=[];
var idPixelAnterior="px";

// Esta variable se declara para guardar 
// la grilla-pixeles al llamar la funciona de guardar en png. 
var $grillaDePixeles;

// Variable para determinar si el
// mouse se encuentra presionado o no.
var mousePresionado = false;

// Variable jQuery para guardar el elemento 'color-personalizado'
// Es decir, el que se elige con la rueda de color.
var $colorPersonalizado = $('#color-personalizado');

$colorPersonalizado.change(function() {
  // Se guarda el color de la rueda en colorActual
  colorActual = $colorPersonalizado.val();
  // Completar para que cambie el indicador-de-color al colorActual
  $("#indicador-de-color").css("background-color",colorActual);
});

// Guardo en variables los elementos 
// paleta y grilla-pixeles
var $paleta=$("#paleta");
var $grilla_pixeles=$("#grilla-pixeles");

// La siguente función 
// crea la Paleta de Colores.
function crearPaletaColores(){
  for(var $i=0;$i<nombreColores.length;$i++){
    var $elementoNuevo = $('<div>');
    $elementoNuevo.css("background-color",nombreColores[$i]);
    $elementoNuevo.addClass('color-paleta');
    $paleta.append($elementoNuevo);
  }
}

// La siguente función 
// crea la Grilla de Pixeles.
function crearGrillaPixeles(){
  for(var i=1;i<1750;i++){
    var $pixelNuevo=$('<div>');
    $pixelNuevo.attr("id","px"+i);
    $grilla_pixeles.append($pixelNuevo);
  }
}

// Función para pintar un pixel
// Parametros:
//   pid=id del pixel
//   bgc=background-color
function pintarPixel(pid,bgc){
  $("#"+pid).css("background-color",bgc);
}

$(document).ready(function(){
  crearPaletaColores();
  crearGrillaPixeles();

  // La siguente función asigna el
  // color seleccionado de la Paleta de Colores.
  $(".color-paleta").click(function(){
    $("#indicador-de-color").css("background-color",$(this).css("background-color"));
  });

  // Tomamos acciones cuando el mouse
  // se presiona y se suelta sobre los pixeles.
  // Y cuando se mueve presionado sobre otros pixeles.
  $("#grilla-pixeles").children().mousedown(function(){
    mousePresionado=true;
    $deshacerPixel=[];
    idPixelAnterior="px";
  });
  $("#grilla-pixeles").children().mouseup(function(){
    mousePresionado=false;
  });
  $("#grilla-pixeles").children().mousemove(function(){
    if(mousePresionado){
      var aux=$(this).attr("id");
      if(aux!=idPixelAnterior){
        idPixelAnterior=aux;
        $deshacerPixel.push({ "idPixel":$(this).attr("id"), "bgColor":$(this).css("background-color")});
      }
      pintarPixel($(this).attr("id"),$("#indicador-de-color").css("background-color"));
    }
  });

  // Agregamos a cada pixel la funcionalidad
  // para que pueda pintarse con el color seleccionado.
  $("#grilla-pixeles").children().click(function(){
    $deshacerPixel=[{ "idPixel":$(this).attr("id"), "bgColor":$(this).css("background-color") }];
    pintarPixel($(this).attr("id"),$("#indicador-de-color").css("background-color"));
  });

  // Agregamos la funcionalidad al 
  // botón Borrar Todo para que limpie la grilla-pixeles.
  $("#borrar").click(function(){
    var $pixeles=$("#grilla-pixeles").children();
    $pixeles.animate({
      "background-color": "white"
    },1000);
  });

  // Agregamos la funcionalidad para 
  // cargar los superheroes en la grilla-pixeles.
  $(".imgs li img").click(function(){
    var id=$(this).attr("id");
    if(id=="batman") cargarSuperheroe(batman);
    if(id=="wonder") cargarSuperheroe(wonder);
    if(id=="flash") cargarSuperheroe(flash);
    if(id=="invisible") cargarSuperheroe(invisible);
  });

  // Agregamos la funcionalidad para 
  // guardar en formato png la grilla-pixeles.
  $("#guardar").click(function(){
    $grillaDePixeles=$("#grilla-pixeles");
    guardarPixelArt();
  });

  $("#deshacer").click(function(){
    for(var i=0;i<$deshacerPixel.length;i++){
      pintarPixel($deshacerPixel[i].idPixel,$deshacerPixel[i].bgColor);
    }
  });

});