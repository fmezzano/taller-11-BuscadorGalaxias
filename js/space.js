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
                <div class="list-group-item list-group-item-action cursor-pointer">
                <div class="row">
                  <div class="col-3">
                    <img src="${img}" alt="${title}" class="img-thumbnail">
                  </div>
                  <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                      <h4 class="mb-1">${title}</h4>
                      <small class="text-muted">Fecha: ${date}</small>
                    </div>
                    <p class="mb-1">${description}</p>
                  </div>
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