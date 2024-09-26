import GameBoard from "./GameBoard.js";
import PlayerManager from "./PlayerManager.js";
import DisplayController from "./DisplayController.js";

class Game {
    constructor() {
        this.board = new GameBoard();
        this.playerManager = new PlayerManager("Player One", "Player Two");
        this.displayController = new DisplayController();
        this.gameOver = false;
        this.turnCount = 0;
        this.winner = null;
    }

    start() {
        this.displayController.resetDisplay();
        this.displayController.updateMainBanner("Game has begun!");
        this.displayController.updateCurrentPlayerBanner(this.playerManager.getCurrentPlayer().name);
        this.displayController.updateCurrentMarkerBanner(this.playerManager.getCurrentPlayer().marker);

        this.displayController.gridSquareButtons.forEach((btn) => {
            btn.addEventListener('click', () => this.playTurn(btn.id));
        });
    }

    playTurn(index) {
        if (this.gameOver) return;

        const row = Math.floor(index / 3) + 1;
        const col = (index % 3) + 1;

        if (!this.board.isMarked(this.board.rowColToIndex(row, col))) {
            this.board.mark(row, col, this.playerManager.getCurrentPlayer().marker);
            this.displayController.updateSquare(index, this.playerManager.getCurrentPlayer().marker);

            if (this.isOver()) {
                this.gameOver = true;
                this.winner = this.playerManager.getCurrentPlayer();
                this.displayController.updateMainBanner(`${this.winner.name} Won!`);
            } else {
                this.turnCount++;
                if (this.turnCount > 8) {
                    this.gameOver = true;
                    this.displayController.updateMainBanner("It's a Tie!");
                } else {
                    this.playerManager.switchPlayer();
                    this.displayController.updateCurrentMarkerBanner(this.playerManager.getCurrentPlayer().marker);
                    this.displayController.updateCurrentPlayerBanner(`${this.playerManager.getCurrentPlayer().name}`);
                }
            }
        }
    }

    isOver() {
        const winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        return winningCombos.map(combo => {
            const [a, b, c] = combo;
            return this.board.getBoard()[a] !== '-' && this.board.getBoard()[b] === this.board.getBoard()[a] && this.board.getBoard()[c] === this.board.getBoard()[a];
        }).filter(Boolean).length > 0;
    }
}

export default Game;
