class Fondo {
    // Constructor que recibe tres parámetros
    constructor(nombrePais, nombreCapital, nombreCircuitoF1) {
        // Atributos de la clase que almacenan los valores recibidos
        this.nombrePais = nombrePais;
        this.nombreCapital = nombreCapital;
        this.nombreCircuitoF1 = nombreCircuitoF1;
    }

    // Método para realizar la consulta AJAX a la API de Flickr
    obtenerImagenCircuito() {
        // Tu API Key de Flickr - reemplázala con la que obtengas de Flickr
        const apiKey = 'TU_API_KEY_DE_FLICKR';
        const searchText = this.nombreCircuitoF1;
        const flickrApiUrl = 'https://www.flickr.com/services/rest/';

        // Realizar la consulta AJAX usando jQuery
        $.ajax({
            url: flickrApiUrl,
            method: 'GET',
            dataType: 'json',
            data: {
                method: 'flickr.photos.search',
                api_key: apiKey,
                text: searchText,
                format: 'json',
                nojsoncallback: 1,
                per_page: 1 // Solo queremos una imagen
            },
            success: function(response) {
                if (response.photos && response.photos.photo.length > 0) {
                    const photo = response.photos.photo[0];
                    const photoUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
                    console.log('Imagen encontrada:', photoUrl);
                } else {
                    console.log('No se encontraron imágenes para el circuito especificado.');
                }
            },
            error: function(error) {
                console.error('Error en la consulta AJAX:', error);
            }
        });
    }
}
