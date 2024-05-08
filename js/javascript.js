let clavePublica = '21dbc6b1dfb8c0244e3a1f05faa5ecc3';
let clavePrivada = '7047e6cbbcd87df945706d8096b84c57ce883ce3';
let idPersonaje = '1009368'; // ID de Iron Man para prueba

let url = `https://gateway.marvel.com:443/v1/public/characters/${idPersonaje}?apikey=${clavePublica}`;

fetch(url)
    .then(respuesta => respuesta.json())
    .then(datos => {
        let personaje = datos.data.results[0];
        let contenedorPersonajes = document.getElementById('info-personaje');
        contenedorPersonajes.innerHTML += `
            <div class="tarjeta">
                <h1>${personaje.name}</h1>
                <img src="${personaje.thumbnail.path}.${personaje.thumbnail.extension}" alt="${personaje.name}">
                <p>${personaje.description}</p>
            </div>
        `;
    });
