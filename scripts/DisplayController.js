class DisplayController {
    constructor() {
        this.gridDiv = document.querySelector(".grid");
        this.gridSquareButtons = this.initializeGridSquaresArray();
        this.bannerDiv = document.querySelector(".banner-container");
        this.bannerMainDiv = document.querySelector(".banner-main-container");
        this.bannerCurrentPlayer = document.querySelector(".current-player");
        this.bannerCurrentMarker = document.querySelector(".current-marker");
        this.updateDisplay();
    }

    initializeGridSquaresArray() {
        return Array.from({ length: 9 }, (_, id) => {
            let btn = document.createElement('button');
            btn.setAttribute("id", id);
            btn.classList.add("grid-square");
            return btn;
        });
    }

    updateDisplay() {
        this.gridDiv.innerText = "";
        this.gridSquareButtons.forEach(btn => {
            this.gridDiv.appendChild(btn);
        });
    }

    resetDisplay() {
        this.gridSquareButtons.forEach(btn => {
            btn.innerText= '';
        });
        this.updateDisplay();
    }

    updateSquare(index, marker) {
        this.gridSquareButtons[index].innerText = marker;
    }

    updateMainBanner(message) {
        this.bannerMainDiv.innerText = message;
    }
    updateCurrentPlayerBanner(player){
        this.bannerCurrentPlayer.innerText = player;
    }
    updateCurrentMarkerBanner(marker){
        this.bannerCurrentMarker.innerText = marker;
    }
}

export default DisplayController;
