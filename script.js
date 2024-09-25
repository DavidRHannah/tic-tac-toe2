class Player{
    constructor(name, marker){
        this.name = name;
        this.marker = marker;
    }
};
class PlayerManager{
    constructor(playerOneName, playerTwoName){
        this.playerOne = new Player(playerOneName, 'o');
        this.playerTwo = new Player(playerTwoName, 'x');
        this.currentPlayer = this.playerOne;        
    }
    getCurrentPlayer(){
        return this.currentPlayer;
    }
    switchPlayer(){
        if (this.currentPlayer == this.playerOne){
            this.currentPlayer = this.playerTwo;
        } else{
            this.currentPlayer = this.playerOne;
        }
    }
}
class GameBoard {
    constructor(){
        this.board = this.createBoard();
    }
    createBoard() {
        return Array(9).fill('-');
    }
    displayBoard(){
        const display = this.board.map(cell => (cell === null ? '-' : cell)).join(' ');
        return `${display.slice(0, 5)}\n${display.slice(6, 11)}\n${display.slice(12)}`;
    }
    rowColToIndex(row, col){
        if (row < 1 || row > 3){
            return false;
        }
        else if (col < 1 || col > 3){
            return false;
        }
        const index = ((row-1)*3) + col - 1;
        return index;
    }

    // row and col are 1-indexed
    // false if index out of bounds
    // true if mark applied 
    mark(row, col, marker){
        const index = this.rowColToIndex(row,col);
        if (index === false){
            return false;
        }
        if (!this.isMarked(index)){
            this.board[index] = marker;
        } else {
            return false;
        }
    }
    isMarked(index){
        if (index < 0 || index > 8){
            return true;
        }
        if (this.board[index] !== '-'){
            return true;
        }
        return false;
    }
};

class Game{
    constructor(){
        this.board = new GameBoard;
        this.playerManager = new PlayerManager("player1", "player2");
    }
    start(){
        console.log("Game has begun!\n");
        
        while(1){
            this.playTurn();
            console.log(this.board.displayBoard());
        }

    }
    playTurn(){         
        console.log(`${this.playerManager.getCurrentPlayer().name}'s turn.\n`);
        let move = [];
        do{
            move = this.getMove();
        } while (move == false || this.board.isMarked(this.board.rowColToIndex(Number(move[0]), Number(move[1]))) == true);
        this.board.mark(Number(move[0]), Number(move[1]), this.playerManager.getCurrentPlayer().marker);
        this.playerManager.switchPlayer();
    }
    getMove(){
        let input = prompt("Row(1-3), col(1-3): ");
        const digits = input.match(/\d/g);
        if (digits.length < 2){
            return false;
        }

        return digits.slice(0, 2);
    }
}

let game = new Game;
game.start();