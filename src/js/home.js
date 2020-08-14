
async function getDatos(url) {
  const respuesta = await fetch(url);
  const datos = await respuesta.json();
  return datos;
}
const $form = document.getElementById("form");
const $spinner = document.getElementById('spinner');
const BASE_API = 'https://images-api.nasa.gov/';

const $aviso = document.getElementById('aviso');
const $fotos = document.getElementById('fotos');





function FotoItemTemplate(foto) {
  //   var str = foto.data[0].date_created
  // console.log(str ,str.substr(0, 10))
  return `<div class="col-xl-3 col-md-4">
    <div class="card mb-4 shadow-sm" >
    <img src="${foto.links[0].href}" class="card-img-top" alt="..." hidden>
    <div class="card-bg-img" style="background-image:url(${foto.links[0]
      .href});"></div>
    <div class="card-body">
      <h5 class="card-title mb-0">${foto.data[0].nasa_id}</h5>
      <span class="badge date">${foto.data[0].date_created.substr(0, 10)}</span>
      <div class="badges mb-2">
      <span class="badge badge-warning">${foto.data[0].keywords}</span>
      </div>
      <p class="card-text">${foto.data[0].description}</p>
    </div>
    </div>
  </div>`;
}

function AvisoTemplate(titulo, mensaje) {
  return (`<div class="content-box-md">
  <div class="container">
    <div class="row">
      <div class="col-md-12 text-center  wow slideInDown">
        <div class="horizontal-heading">
          <h2>${titulo}</h2>
          <h5>${mensaje}</h5>
        </div>
      </div>
    </div>
  </div>
</div>`)
}

function CrearPlantilla(HTMLString) {
  const html = document.implementation.createHTMLDocument();
  html.body.innerHTML = HTMLString;
  return html.body.children[0];
}

const $carousel = document.getElementById('carousel');
const $fotosContenedor = document.querySelector("#fotos");

/* =====================================
         BUSCAR
======================================*/
function setAtributos($elemento, atributos) {
  for (const atributo in atributos) {
    $elemento.setAttribute(atributo, atributos[atributo]);
  }
}

const $loader = document.createElement("div");

$fotos.append($loader);
setAtributos($loader, {
  id: "spinner",
  role: "status"
});

$form.addEventListener("submit", async event => {
  event.preventDefault()
  // $spinner.classList.add('lds-hourglass', 'mx-auto', 'd-block');
  $spinner.classList.add('spinner-border');
  const data = new FormData($form)
  // const buscado = await getDatos(`${BASE_API}search?q=${data.get('buscar')}`)
  // const {
  //   collection: {
  //     items: buscado
  //   }
  // } = await getDatos(`${BASE_API}search?q=${data.get('buscar')}`)

  const { collection: buscado } = await getDatos(`${BASE_API}search?q=${data.get('buscar')}`)
  // debugger
  renderAlbumList(buscado.items, $fotosContenedor);
  // ElementoEncontrado(buscado.collection.metadata.total_hits);
ShowAviso(buscado.metadata.total_hits)
})

function ShowAviso(busqueda) {

  if (busqueda > "0") {
    const HTMLString = AvisoTemplate(busqueda, "Resultados encontrados")
    const Aviso = CrearPlantilla(HTMLString)
    $aviso.append(Aviso)
  } else {
    const HTMLString = AvisoTemplate("¡Vaya!","No se han encontrado resultados para su búsqueda")
    const Aviso = CrearPlantilla(HTMLString)
    $aviso.append(Aviso)
  }

}

function renderAlbumList(lista, $contenedor) {
  $carousel.setAttribute("hidden", "");
  $contenedor.children[0].remove(); // quitar el spiner
  lista.forEach(lista => {
    // console.log(lista)
    const HTMLString = FotoItemTemplate(lista);
    const AlbumItems = CrearPlantilla(HTMLString);
    $contenedor.append(AlbumItems);
    addEventClick(AlbumItems);
    // console.log(HTMLString)
    // console.log(HTMLString)
  });
}

/* =====================================
      Quita txt busqueda
======================================*/
const $input = document.getElementById("input");
$input.onmouseover = function () {
  $input.value = '';
}
/* =====================================
      Quita Hijos de Album
======================================*/
function removeAllChildFotos(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.lastChild);
  }
}
$input.onclick = function () {
  removeAllChildFotos($fotos)
  $fotos.append($loader);
  setAtributos($loader, {
    id: "spinner",
    class: ""
  });
  removeAllChildFotos($aviso)
}


/* =====================================
        MODAL
======================================*/
function addEventClick($element) {
  $element.addEventListener("click", () => {
    // alert("clikazo");
    showModal();
  });
}

const $modal = document.getElementById("modal");
const $overlay = document.getElementById("overlay");
// const $cerrarModal = document.getElementById("cerrar-modal");
const $cerrarModal = document.getElementById("modal");

function showModal() {
  $overlay.classList.add("active");
  $modal.style.animation = "modalIn .8s forwards";
}

$cerrarModal.addEventListener("click", cerrarModal);
function cerrarModal() {
  $overlay.classList.remove("active");
  $modal.style.animation = "modalOut .8s forwards";
}



/* =====================================
          Activacion WOW
======================================*/
$(function () {
  new WOW().init();
});
// home animacion y cuando carga la web
$(window).on('load', function () {
  $("#home-heading-1").addClass("animated fadeInDown");
  $("#home-heading-2").addClass("animated fadeInLeft");
  $("#home-text").addClass("animated zoomIn");
  $("#home-btn").addClass("animated zoomIn");
});




