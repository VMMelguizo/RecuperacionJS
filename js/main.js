/*
@autor: Victor Manuel Melguizo Guerrero
@version: 1.0.0
@description:
    Proyecto Recuperación Javascript
    Para iniciar el servidor JSON escribir en consola .//peliculas.sh
*/

//Inicializacion de variables:
//Body
const $body = document.querySelector('body');
//JSON Peliculas
let objPeliculas = [];
//JSON URL
const urlPeliculas = [];
let urlImg = '';
//Elementos NAV
const $navElement = document.createElement('nav'),
    $divPage = document.createElement('div'),
    $divName = document.createElement('div'),
    $divCounter = document.createElement('div'),
    $formAction = document.createElement('form'),
    $btnBackup = document.createElement('input'),
    $btnSearch = document.createElement('input');
//Elementos Template
const $sectionElement = document.createElement('section'),
    $templateElement = document.createElement('template'),
    $divCard = document.createElement('div'),
    $imgCard = document.createElement('img'),
    $bodyCard = document.createElement('div'),
    $titleCard = document.createElement('h5'),
    $valorationCard = document.createElement('div');
//Elementos Modal Modificar
const $modalElement = document.createElement('div'),
    $modalContent = document.createElement('div'),
    $titulo = document.createElement('input'),
    $puntuacion = document.createElement('input'),
    $guardar = document.createElement('input'),
    $cancelar = document.createElement('input');
//Elementos Modal Borrar
const $modalElement1 = document.createElement('div'),
    $modalContent1 = document.createElement('div'),
    $titulo1 = document.createElement('h3'),
    $borrar = document.createElement('input'),
    $cancelar1 = document.createElement('input');
//Nodos de texto
const $namePage = document.createTextNode('DEWC Recuperación Javascript'),
    $nameAuthor = document.createTextNode('Víctor Manuel Melguizo Guerrero'),
    $cantidadNav = document.createTextNode('Nº Peliculas: '),
    $borrarTxt = document.createTextNode('¿Esta seguro de que desea borrar la pelicula?');

//Fijar atributos a las variables:
//Body
$body.setAttribute('style', 'background-color: #7b8aa8;');
//NAV
$btnBackup.setAttribute('type', 'button');
$btnBackup.setAttribute('value', 'Backup');
$navElement.setAttribute('class', 'nav justify-content-center');
$navElement.setAttribute('style', 'background-color: #272b51;');
$divPage.setAttribute('class', 'nav-item px-3 py-1 mx-3 my-2 text-white');
$divName.setAttribute('class', 'nav-item px-3 py-1 mx-3 my-2 text-white');
$divCounter.setAttribute('class', 'nav-item px-3 py-1 mx-3 my-2 text-white');
$formAction.setAttribute('class', 'nav-item text-white');
$btnBackup.setAttribute('class', 'px-3 py-1 mx-3 my-2 btn btn-info');
$btnSearch.setAttribute('class', 'px-3 py-1 mx-3 my-2');
$btnSearch.setAttribute('type', 'text');
$btnSearch.setAttribute('id', 'search');
$btnSearch.setAttribute('placeholder', 'Buscar');
//Template
$sectionElement.setAttribute('class', 'section m-2 p-1 card-group ');
$sectionElement.setAttribute('style', 'display: inline-block;');
//$templateElement.setAttribute('class', 'card-group ');
$divCard.setAttribute('class', 'card m-3 p-3 col-lg-2 col-sm-4 ');
$divCard.setAttribute('style', 'background-color: #272b51; border-radius: 15px; display: inline-block;');
$imgCard.setAttribute('class', 'card-img-top img-fluid');
$bodyCard.setAttribute('class', 'card-body');
$titleCard.setAttribute('class', 'card-title text-white');
$valorationCard.setAttribute('class', 'card-text text-white');
//MODAL Modificar
$guardar.setAttribute('type', 'button');
$guardar.setAttribute('value', 'Guardar');
$guardar.setAttribute('class', 'px-3 py-1 mx-3 my-2 btn btn-info');
$cancelar.setAttribute('type', 'button');
$cancelar.setAttribute('value', 'Cancelar');
$cancelar.setAttribute('class', 'px-3 py-1 mx-3 my-2 btn');
$modalElement.setAttribute('class', 'modal');
$modalElement.setAttribute('id', 'formulario');
$modalContent.setAttribute('class', 'modal-content');
$titulo.setAttribute('type', 'text');
$puntuacion.setAttribute('type', 'number');
//MODAL Borrar
$borrar.setAttribute('type', 'button');
$borrar.setAttribute('value', 'Borrar');
$borrar.setAttribute('class', 'px-3 py-1 mx-3 my-2 btn btn-info');
$cancelar1.setAttribute('type', 'button');
$cancelar1.setAttribute('value', 'Cancelar');
$cancelar1.setAttribute('class', 'px-3 py-1 mx-3 my-2 btn');
$modalElement1.setAttribute('class', 'modal');
$modalElement1.setAttribute('id', 'borrado');
$modalContent1.setAttribute('class', 'modal-content');

//Introducir Elementos en el DOM:
//NAV
$divPage.appendChild($namePage);
$navElement.appendChild($divPage);
$divName.appendChild($nameAuthor);
$navElement.appendChild($divName);
$divCounter.appendChild($cantidadNav);
$navElement.appendChild($divCounter);
$navElement.appendChild($btnBackup);
$navElement.appendChild($btnSearch);
$body.appendChild($navElement);
//Template
$divCard.appendChild($imgCard);
$bodyCard.appendChild($titleCard);
$bodyCard.appendChild($valorationCard);
$divCard.appendChild($bodyCard);
$templateElement.appendChild($divCard);
$sectionElement.appendChild($templateElement);
$body.appendChild($sectionElement);
//Modal Modificar
$modalContent.appendChild($titulo);
$modalContent.appendChild($puntuacion);
$modalContent.appendChild($guardar);
$modalContent.appendChild($cancelar);
$modalElement.appendChild($modalContent);
$body.appendChild($modalElement);
//Modal Borrar
$titulo1.appendChild($borrarTxt);
$modalContent1.appendChild($titulo1);
$modalContent1.appendChild($borrar);
$modalContent1.appendChild($cancelar1);
$modalElement1.appendChild($modalContent1);
$body.appendChild($modalElement1);

//Carga de la informacion de los JSON:
//URL
fetch('http://localhost:4500/datos')
    .then((response) => {
        return response.json();
    })
    .then((response) => {
        urlPeliculas.push(response);
    }).then(() => {
        urlImg = urlPeliculas[0][0].urlPeliculas.slice(0, -1);
    }).catch((error) => console.log(error.message))
//Datos Peliculas:
fetch('http://localhost:4500/results')
    .then((response) => {
        return response.json();
    })
    .then((response) => {
        response.forEach(peliculas => {
            const pelicula = new Pelicula(peliculas);
            objPeliculas.push(pelicula);
        });
    }).then((response) => {
        cargarPeliculas();
    }).then(() => {
        const $numCantNav = document.createTextNode(objPeliculas.length);
        $divCounter.appendChild($numCantNav);
    }).catch((error) => console.log(error.message))

//Clases creadas:
class Pelicula {
    constructor(pelicula) {
        //propiedades
        this.poster = urlImg + pelicula.poster_path;
        this.nombre = pelicula.original_title;
        this.puntuacion = pelicula.vote_average;
        //metodos
    };
}

//Funciones creadas:

/**
 * Esta funcion carga las peliculas y hace visibles sus cards
 */
const cargarPeliculas = async () => {
    $sectionElement.innerHTML = "";
    const $template = $templateElement.content,
        $fragment = document.createDocumentFragment();

    objPeliculas.forEach(pelicula => {
        const $peliName = document.createTextNode(pelicula.nombre),
            $peliVal = document.createTextNode('Valoración: ')
        $peliPunt = document.createTextNode(pelicula.puntuacion);

        $titleCard.appendChild($peliName);
        $imgCard.setAttribute("src", pelicula.poster);
        $imgCard.setAttribute("alt", pelicula.nombre);
        $imgCard.setAttribute("onclick", "abrirModal('" + pelicula.nombre + "'," + pelicula.puntuacion + ")");
        $bodyCard.setAttribute("onclick", "abrirModal1('" + pelicula.nombre + "')");
        $valorationCard.appendChild($peliVal);
        $valorationCard.appendChild($peliPunt);
        $bodyCard.appendChild($titleCard);
        $bodyCard.appendChild($valorationCard);
        $divCard.appendChild($imgCard);
        $divCard.appendChild($bodyCard);

        let $clonado = document.importNode($divCard, true);
        $fragment.appendChild($clonado);
        $titleCard.removeChild($peliName);
        $valorationCard.removeChild($peliPunt);
        $valorationCard.removeChild($peliVal);
        $template.appendChild($fragment);
        $sectionElement.appendChild($template);
        $body.appendChild($sectionElement);
        document.body.appendChild($fragment);
    });
}

/**
 * Esta funcion hace una copia del JSON en el LocalStorage
 */
function guardarCopiaSeguridad() {
    const objPeliculasString = JSON.stringify(objPeliculas);
    localStorage.setItem("PeliculasCopiaSeguridad", objPeliculasString);
}

/**
 * Esta funcion sirve para buscar cards por su titulo
 */
function searchCards() {
    var input = $("#search").val().toLowerCase();
    $(".card").each(function () {
        var title = $(this).find(".card-title").text().toLowerCase();
        if (title.indexOf(input) > -1) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
}

/**
 * Abre el modal para modificar la informacion de una pelicula
 * @param {String} tituloActual 
 * @param {Number} puntuacionActual 
 */
function abrirModal(tituloActual, puntuacionActual) {
    const modal = document.getElementById('formulario');

    $titulo.value = tituloActual;
    $puntuacion.value = puntuacionActual;

    $guardar.addEventListener('click', function () {
        const tituloNuevo = $titulo.value;
        const puntuacionNuevo = $puntuacion.value;

        objPeliculas.forEach(pelicula => {
            if (pelicula.nombre == tituloActual) {
                pelicula.nombre = tituloNuevo;
                pelicula.puntuacion = puntuacionNuevo;
            }
        });
        modal.style.display = 'none';
        modal.addEventListener('hidden.bs.modal', cargarPeliculas());
    });
    $cancelar.addEventListener('click', function () {
        modal.style.display = 'none';
    });
    modal.style.display = 'block';
}

// Evita que se ingresen en el search los caracteres prohibidos
$("#search").on("keydown", function (event) {
    if (event.key === "-" || event.key === ";" || event.key === "$" || event.key === "@" || event.key === "'" || event.key === '"' || event.key === "`") {
        event.preventDefault();
    }
});

function abrirModal1(titulo) {
    const modal = document.getElementById('borrado');

    $borrar.addEventListener('click', function () {
        objPeliculas = objPeliculas.filter(pelicula => pelicula.nombre !== titulo);
        modal.style.display = 'none';
        modal.addEventListener('hidden.bs.modal', cargarPeliculas());
    });
    $cancelar1.addEventListener('click', function () {
        modal.style.display = 'none';
    });
    modal.style.display = 'block';
}

// Evita que se ingresen en el search los caracteres prohibidos
$("#search").on("keydown", function (event) {
    if (event.key === "-" || event.key === ";" || event.key === "$" || event.key === "@" || event.key === "'" || event.key === '"' || event.key === "`") {
        event.preventDefault();
    }
});

//Eventos Backup & Search
$btnBackup.addEventListener("click", guardarCopiaSeguridad);
$btnSearch.addEventListener("keyup", searchCards);
