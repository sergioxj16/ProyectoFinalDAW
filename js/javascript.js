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

function buscarComics(urlComics) {
    const urlComicsSeguro = urlComics.replace('http://', 'https://') + `?apikey=${clavePublica}`;
    fetch(urlComicsSeguro)
        .then(respuesta => respuesta.json())
        .then(datos => {
            let comics = datos.data.results;
            mostrarComics(comics);
        });
}

function mostrarComics(comics) {
    let contenedorComics = document.getElementById('contenedor-comics');
    contenedorComics.innerHTML = '';
    comics.forEach(comic => {
        let tarjetaComic = document.createElement('div');
        tarjetaComic.className = 'tarjeta-comic';
        tarjetaComic.innerHTML = `
            <h2>${comic.title}</h2> 
            <ul></ul>
        `;
        let listaCreadores = tarjetaComic.querySelector('ul');
        comic.creators.items.forEach(creador => {
            let elementoLista = document.createElement('li');
            elementoLista.textContent = `${creador.name} (${creador.role})`;
            listaCreadores.appendChild(elementoLista);
        });
        contenedorComics.appendChild(tarjetaComic);
    });

    document.getElementById('subtitulo-comics').style.display = 'block';
    document.getElementById('contenedor-comics').style.display = 'block';
}

function buscarSeries(nombre) {
    const urlSeries = `${urlSeriesBase}${nombre}&apikey=${clavePublica}`;
    fetch(urlSeries)
        .then(respuesta => respuesta.json())
        .then(datos => {
            let series = datos.data.results;
            mostrarSeries(series);
        });
}

function mostrarSeries(series) {
    let contenedorSeries = document.getElementById('contenedor-series');
    contenedorSeries.innerHTML = '';
    series.forEach(serie => {
        let tarjetaSerie = document.createElement('div');
        tarjetaSerie.className = 'tarjeta-objeto';
        tarjetaSerie.innerHTML = `
            <h4>${serie.title}</h4> 
            <p>${serie.description}</p>
        `;
        contenedorSeries.appendChild(tarjetaSerie);
    });

    document.getElementById('subtitulo-series').style.display = 'block';
    document.getElementById('contenedor-series').style.display = 'block';
}
