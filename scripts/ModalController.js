import Game from './Game.js';

class ModalController {
    constructor() {
        this.startModal = document.getElementById("start-modal");
        this.playerTypeModal = document.getElementById("player-type-modal");
        this.restartModal = document.getElementById("restart-modal");
        this.init();
    }
    
    init() {
        // Start Modal
        document.getElementById("start-yes").addEventListener("click", () => {
            this.closeAllModals();
            this.openModal(this.playerTypeModal);
        });

        document.getElementById("start-no").addEventListener("click", () => {
            this.closeAllModals();            
            alert("Refresh to play.");
        });

        // Player Type Modal
        document.getElementById("pvp").addEventListener("click", () => {
            this.closeAllModals();
            this.startGame("PVP");
        });

        document.getElementById("pve").addEventListener("click", () => {
            this.closeAllModals();
            this.startGame("PVE");
        });

        // Restart Modal
        document.getElementById("restart-yes").addEventListener("click", () => {
            this.closeAllModals();
            this.startGame(this.currentMode);
        });

        document.getElementById("restart-no").addEventListener("click", () => {
            this.closeAllModals();
            this.openModal(this.startModal);
        });

        window.addEventListener("click", (event) => {
            if (event.target === this.startModal || event.target === this.playerTypeModal || event.target === this.restartModal) {
                this.closeAllModals();
            }
        });
    }

    openModal(modal) {
        modal.style.display = "block";
    }

    closeModal(modal) {
        modal.style.display = "none";
    }

    closeAllModals() {
        this.closeModal(this.startModal);
        this.closeModal(this.playerTypeModal);
        this.closeModal(this.restartModal);
    }

    begin() {
        this.closeAllModals();
        this.openModal(this.startModal);
    }

    startGame(mode) {
        this.closeAllModals();
        this.currentMode = mode;
        const game = new Game(this, mode);
        game.start();
    }

    endGame() {
        this.closeAllModals();
        this.openModal(this.restartModal);
    }
}

export default ModalController;
