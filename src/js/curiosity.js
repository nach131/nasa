console.log('hola mundo!');

(async function load(){

async function getDatos(url) {
  const respuesta = await fetch(url)
  const datos = await respuesta.json()
  return datos
}
const buscarList = await getDatos("https://images-api.nasa.gov/search?q=discovery&page=2")
const buscarListEndeavour = await getDatos("https://images-api.nasa.gov/search?q=Endeavour&page=32")
const buscarListMarte = await getDatos("https://images-api.nasa.gov/search?q=Opportunity&page=2")
const buscarListTierra = await getDatos("https://images-api.nasa.gov/search?q=earth&page=1")
// const buscarListISS = await getDatos("https://images-api.nasa.gov/search?q=iss&page=1")
const buscarListISS = await getDatos("https://images-api.nasa.gov/search?q=crew%20dragon%20splashdown&page=1")
const buscarListCuriosity = await getDatos("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=EUDrgZhfxHUUr5GwtaCDh0FjiAxQsboz8BoR7MCY")
// debugger
console.log(buscarListCuriosity)


function FotoItemTemplate(foto){
  return(
    `<div class="col-xl-3 col-md-4">
    <div class="card mb-4 shadow-sm" >
    <img src="${foto.links[0].href}" class="card-img-top" alt="..." hidden>
    <div class="card-bg-img" style="background-image:url(${foto.links[0].href});"></div>
    <div class="card-body">
      <h5 class="card-title mb-0">${foto.data[0].nasa_id}</h5>
      <span class="badge date">${foto.data[0].date_created.substr(0, 10)}</span>
      <div class="badges mb-2">
        <span class="badge badge-warning">${foto.data[0].keywords}</span>
      </div>
      <p class="card-text">${foto.data[0].description}</p>
    </div>
    </div>
  </div>`
  )
}
function CrearPlantilla(HTMLString){
  const html = document.implementation.createHTMLDocument()
  html.body.innerHTML = HTMLString
  return html.body.children[0]
}

function renderAlbumList(lista, $contenedor){
  $contenedor.children[0].remove() // quitar el spiner
  lista.forEach((lista)=>{
    // console.log(lista)
    const HTMLString = FotoItemTemplate(lista)
    const AlbumItems = CrearPlantilla(HTMLString)
    $contenedor.append(AlbumItems)
    // console.log(HTMLString)
  })
}

// const $fotosContenedor = document.querySelector('#fotos')
// renderAlbumList(buscarList.collection.items, $fotosContenedor)

const $issContenedor = document.getElementById('iss')
renderAlbumList(buscarListISS.collection.items, $issContenedor)

// const $marteContenedor = document.getElementById('marte')
// renderAlbumList(buscarListMarte.collection.items, $marteContenedor)

// const $fotosContenedor = document.querySelector('#tierra')
// renderAlbumList(buscarListTierra.collection.items, $fotosContenedor)


})()