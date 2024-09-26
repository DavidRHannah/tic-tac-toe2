import GameBoard from "./GameBoard.js";
import PlayerManager from "./PlayerManager.js";

class Game{
    constructor(){
        this.board = new GameBoard;
        this.playerManager = new PlayerManager("player1", "player2");
        this.gameOver = false;
        this.turnCount = 0;
        this.winner;
    }
    start(){
        console.log("Game has begun!\n");
        
        while (!this.gameOver) {
            this.playTurn(); 

            if (this.isOver()) {
                this.gameOver = true;
                this.winner = this.playerManager.getCurrentPlayer();
                console.log(`${this.winner.name} wins!`);
                break;
            }
        
            this.turnCount++;
            if (this.turnCount > 8) {
                this.gameOver = true;
                break;
            }
        
            this.playerManager.switchPlayer();
            console.log(this.board.displayBoard());
        }
    }

    isOver(){
        const winningCombos = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6],
        ];
        return winningCombos.map(combo => {
            const [a,b,c] = combo;
            return this.board.getBoard()[a] != '-' && this.board.getBoard()[b] == this.board.getBoard()[a] && this.board.getBoard()[c] == this.board.getBoard()[a];
        }).filter(Boolean).length > 0;
    }

    playTurn(){         
        console.log(`${this.playerManager.getCurrentPlayer().name}'s turn.\n`);
        let move = [];
        do{
            move = this.getMove();
        } while (move == false || this.board.isMarked(this.board.rowColToIndex(Number(move[0]), Number(move[1]))) == true);
        this.board.mark(Number(move[0]), Number(move[1]), this.playerManager.getCurrentPlayer().marker);
    }
    getMove(){
        let input = prompt("Row(1-3), col(1-3): ");
        if (input.length == 0) {
            return false;
        }
        const digits = input.match(/\d/g);
        if (digits.length < 2){
            return false;
        }

        return digits.slice(0, 2);
    }
}

export default Game