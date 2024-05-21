let clavePublica = '21dbc6b1dfb8c0244e3a1f05faa5ecc3';
let clavePrivada = '7047e6cbbcd87df945706d8096b84c57ce883ce3';

document.getElementById('boton-buscar').addEventListener('click', function() {
    let nombrePersonaje = document.getElementById('nombre-personaje').value;
    let url = `https://gateway.marvel.com:443/v1/public/characters?name=${nombrePersonaje}&apikey=${clavePublica}`;

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            if (datos.data.results.length > 0) {
                let personaje = datos.data.results[0];
                let contenedorPersonajes = document.getElementById('info-personaje');
                contenedorPersonajes.innerHTML = `
                    <div class="tarjeta">
                        <h1>${personaje.name}</h1>
                        <img src="${personaje.thumbnail.path}.${personaje.thumbnail.extension}" alt="${personaje.name}">
                        <p>${personaje.description}</p>
                    </div>
                `;

                // Obtén los cómics del personaje
                let urlComics = personaje.comics.collectionURI.replace('http://', 'https://') + `?apikey=${clavePublica}`;
                fetch(urlComics)
                    .then(respuesta => respuesta.json())
                    .then(datos => {
                        let comics = datos.data.results;
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
                    });
            } else {
                contenedorPersonajes.innerHTML = `<p>Personaje no encontrado</p>`;
            }
        });
});
