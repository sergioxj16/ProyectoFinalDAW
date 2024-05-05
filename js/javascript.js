// Aquí puedes añadir tu JavaScript
// Recuerda reemplazar 'yourPublicKey' y 'yourPrivateKey' con tus claves reales
let publicKey = '21dbc6b1dfb8c0244e3a1f05faa5ecc3';
let privateKey = '7047e6cbbcd87df945706d8096b84c57ce883ce3';
let characterId = '1009368'; // ID de Iron Man para prueba

let url = `https://gateway.marvel.com:443/v1/public/characters/${characterId}?apikey=${publicKey}`;

fetch(url)
    .then(response => response.json())
    .then(data => {
        let character = data.data.results[0];
        document.getElementById('character-info').innerHTML = `
            <h1>${character.name}</h1>
            <img src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.name}">
            <p>${character.description}</p>
        `;
    });