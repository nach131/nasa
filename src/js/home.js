(async function load() {
  async function getDatos(url) {
    const respuesta = await fetch(url);
    const datos = await respuesta.json();
    return datos;
  }
  const $form = document.getElementById("form");
  const $spinner = document.getElementById('spinner');
  const BASE_API = 'https://images-api.nasa.gov/';
  
  $form.addEventListener("submit",async event => {
    event.preventDefault()
    $spinner.classList.add('lds-hourglass', 'mx-auto', 'd-block');
    const data = new FormData($form)
    const buscado = await getDatos(`${BASE_API}search?q=${data.get('buscar')}`)
    // debugger
    console.log(buscado)

  })


  const buscarList = await getDatos(
    `${BASE_API}search?q=splashdown&page=5`
  );


  // debugger
  // console.log(buscarList)

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
  function CrearPlantilla(HTMLString) {
    const html = document.implementation.createHTMLDocument();
    html.body.innerHTML = HTMLString;
    return html.body.children[0];
  }

  function addEventClick($element) {
    $element.addEventListener("click", () => {
      // alert("clikazo");
      showModal();
    });
  }

  function renderAlbumList(lista, $contenedor) {
    // $contenedor.children[0].remove() // quitar el spiner
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

  const $fotosContenedor = document.querySelector("#fotos");
  renderAlbumList(buscarList.collection.items, $fotosContenedor);

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
})();
