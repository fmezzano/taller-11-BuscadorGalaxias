document.addEventListener('DOMContentLoaded', function () {
  const busqueda = document.getElementById('inputBuscar')
  const boton = document.getElementById('btnBuscar')
  const container = document.getElementById('contenedor')

  boton.addEventListener('click', function () {
    const buscado = busqueda.value;
    container.innerHTML = ""
    fetch(`https://images-api.nasa.gov/search?q=${buscado}`)
      .then((response) => response.json())
      .then((data) => {
        const items = data.collection.items;
        items.forEach((items) => {
          const title = items.data[0].title;
          const description = items.data[0].description;
          const date = items.data[0].date_created;
          const img = items.links[0].href;
          const aMostrar = `
          <div class="col-md-4 mt-4">
            <div class="card h-100">
              <img class="card-img-top" src="${img}" alt="Card image cap" style="height: 200px; object-fit: cover;">
              <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <div class="card-text" style="max-height: 100px; overflow-y: auto;">
                  ${description}
                </div>
              </div>
              <h6 class="card-subtitle mb-2 text-muted">${date}</h6>
            </div>
          </div>
`
          container.innerHTML += aMostrar
        })
      })
      .catch((error) => {
        console.error('Error al realizar la solicitud a la API:', error);
      })
  })
})