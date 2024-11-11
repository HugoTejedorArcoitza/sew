class Semaforo {
    constructor() {
        this.levels = [0.2, 0.5, 0.8];
        this.lights = 4;
        this.unload_moment = null;
        this.clic_moment = null;
        this.difficulty = this.levels[Math.floor(Math.random() * 3)];
        this.createStructure();
    }

    createStructure() {
        const main = document.querySelector('main');

        // Creación del título
        const header = document.createElement('h1');
        header.textContent = 'Juego de Tiempo de Reacción';
        main.appendChild(header);

        // Creación de las luces del semáforo
        for (let i = 0; i < this.lights; i++) {
            const light = document.createElement('div');
            main.appendChild(light);
        }

        // Creación de los botones
        const startButton = document.createElement('button');
        startButton.textContent = 'Arranque';
        startButton.onclick = this.initSequence.bind(this);
        main.appendChild(startButton);

        const reactionButton = document.createElement('button');
        reactionButton.textContent = 'Reacción';
        reactionButton.disabled = true;
        reactionButton.onclick = this.stopReaction.bind(this);
        main.appendChild(reactionButton);

        // Creación del párrafo para mostrar el tiempo de reacción
        const reactionTime = document.createElement('p');
        main.appendChild(reactionTime);
    }

    initSequence() {
        document.querySelector('main').classList.add('load');
        const startButton = document.querySelector('button:nth-of-type(1)');
        startButton.disabled = true;
        setTimeout(() => {
            this.unload_moment = new Date();
            this.endSequence();
        }, this.difficulty * 1000 + 2000);
    }

    endSequence() {

        document.querySelector('main').classList.add('unload');
        document.querySelector('main').classList.remove('load');
        const reactionButton = document.querySelector('button:nth-of-type(2)');
        reactionButton.disabled = false;
    }

    stopReaction() {
        this.clic_moment = new Date();
        const reactionTime = (this.clic_moment - this.unload_moment) / 1000;
        document.querySelector('p').textContent = `Tiempo de reacción: ${reactionTime.toFixed(3)} segundos`;

        // Resetear botones y clases
        document.querySelector('main').classList.remove('load', 'unload');
        document.querySelector('button:nth-of-type(1)').disabled = false;
        document.querySelector('button:nth-of-type(2)').disabled = true;
    }
}

// Inicializar el semáforo cuando la página cargue
window.onload = () => {
    new Semaforo();
};
