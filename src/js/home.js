console.log('hola mundo!');

(async function load(){

async function getDatos(url) {
  const respuesta = await fetch(url)
  const datos = await respuesta.json()
  return datos
}
const buscarList = await getDatos("https://images-api.nasa.gov/search?q=dragon&page=3")
// debugger
// console.log(buscarList)


function FotoItemTemplate(foto){
  return(
    `<div class="col-xl-3 col-md-4">
    <div class="card mb-4 shadow-sm" >
    <img src="${foto.links[0].href}" class="card-img-top" alt="..." hidden>
    <div class="card-bg-img" style="background-image:url(${foto.links[0].href});"></div>
    <div class="card-body">
      <h5 class="card-title mb-0">${foto.data[0].nasa_id}</h5>
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

const $fotosContenedor = document.querySelector('#fotos')
buscarList.collection.items.forEach((lista)=>{
  // console.log(lista)
  const HTMLString = FotoItemTemplate(lista)
  const AlbumItems = CrearPlantilla(HTMLString)
  $fotosContenedor.append(AlbumItems)
  // console.log(HTMLString)
})



})()