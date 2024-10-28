
class Pais {
    #nombre;
    #capital;
    #circuitoF1;
    #poblacion;
    #formaDeGobierno;
    #coordenadas = { latitud, longitud };
    #religion;
    constructor(nombre, capital, poblacion) {
        this.#nombre = nombre;
        this.#capital = capital;
        this.#poblacion = poblacion;
    }

    rellenarDatos(circuitoF1, formaDeGobierno, coordenadas, religion) {
        this.#circuitoF1 = circuitoF1;
        this.#formaDeGobierno = formaDeGobierno;
        this.#coordenadas = coordenadas;
        this.#religion = religion;
    }

    obtenerNombrePais() {
        return "Pais: " + this.#nombre;
    }

    obtenerCapital() {
        return "Capital: " + this.#capital;
    }

    obtenerInformacionSecundaria() {
        return `
            <ul>
                <li>Nombre del Circuito de F1: ${this.#circuitoF1}</li>
                <li>Población: ${this.#poblacion}</li>
                <li>Forma de Gobierno: ${this.#formaDeGobierno}</li>
                <li>Religión Mayoritaria: ${this.#religion}</li>
            </ul>
        `;
    }

    mostrarInformacion() {
        const contenedor = document.getElementById('info-pais');
        if (contenedor) {
            contenedor.innerHTML = `
                <p>País: ${this.#nombre}</p>
                <p>Capital: ${this.#capital}</p>
                <p>Circuito de F1: ${this.#circuitoF1}</p>
                <p>Población: ${this.#poblacion}</p>
                <p>Forma de Gobierno: ${this.#formaDeGobierno}</p>
                <p>Coordenadas del Circuito: Latitud ${this.#coordenadas.latitud}, Longitud ${this.#coordenadas.longitud}</p>
                <p>Religión Mayoritaria: ${this.#religion}</p>
            `;
        } else {
            console.error("No se encontró un elemento con el id 'info-pais' en el documento HTML.");
        }
    }
}