 // URL de la API de Brawl Stars
const apiUrl = 'https://api.brawlstars.com/v1/';

// Clave de la API de Brawl Stars (debes obtenerla registrándote en la API de Brawl Stars)
const apiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjRhMzE3MmUyLTk4NzYtNDc5OC1hNGMyLTY5ODZmNjZlYWZjYSIsImlhdCI6MTcxNDM3ODg2MCwic3ViIjoiZGV2ZWxvcGVyLzViMDk4ZWUxLTdjNTktNzllOC1kZjFkLWQzM2ZiYjMzMmQ3ZiIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiMTg4LjI2LjIwNS41NiJdLCJ0eXBlIjoiY2xpZW50In1dfQ.R5a8XeqdVoN8F9M3TguELXR3NfeRVYML42JzWpDrbQQD4NK3_TBjWKy9EWQp4l4e3Vk4ESFWHqb4u-fIaNdrlQ';

// Realizar una solicitud GET a la API de Brawl Stars
fetch(apiUrl + 'players/%PLCC00P0', {
    method: 'GET',
    headers: {
        'Authorization': 'Bearer ' + apiKey,
        'Accept': 'application/json',
    }
})
.then(response => {
    if (!response.ok) {
        throw new Error('Error en la solicitud a la API: ' + response.status);
    }
    return response.json();
})
.then(data => {
    console.log(data); // Hacer algo con los datos recibidos de la API
})
.catch(error => {
    console.error('Error al conectarse a la API:', error);
});