const clavePublica = '21dbc6b1dfb8c0244e3a1f05faa5ecc3';
const urlBase = 'https://gateway.marvel.com:443/v1/public/';
const urlPersonajes = `${urlBase}characters?name=`;
const urlSeriesBase = `${urlBase}series?characters=`;

document.getElementById('boton-buscar').addEventListener('click', function() {
    let nombrePersonaje = document.getElementById('nombre-personaje').value;
    buscarPersonaje(nombrePersonaje);
    buscarSeries(nombrePersonaje);
});

function buscarPersonaje(nombre) {
    const urlPersonaje = `${urlPersonajes}${nombre}&apikey=${clavePublica}`;

    fetch(urlPersonaje)
        .then(respuesta => respuesta.json())
        .then(datos => {
            let contenedorPersonajes = document.getElementById('info-personaje');
            if (datos.data.results.length > 0) {
                let personaje = datos.data.results[0];
                mostrarPersonaje(personaje);
                buscarComics(personaje.comics.collectionURI);
            } else {
                contenedorPersonajes.innerHTML = `<p>Personaje no encontrado</p>`;
            }
        });
}

function mostrarPersonaje(personaje) {
    let contenedorPersonajes = document.getElementById('info-personaje');
    contenedorPersonajes.innerHTML = `
        <div class="tarjeta">
            <h1>${personaje.name}</h1>
            <img src="${personaje.thumbnail.path}.${personaje.thumbnail.extension}" alt="${personaje.name}">
            <p>${personaje.description}</p>
        </div>
    `;
}

