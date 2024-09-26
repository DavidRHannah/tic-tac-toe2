import Player from "./Player.js";

class PlayerManager {
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

export default PlayerManager