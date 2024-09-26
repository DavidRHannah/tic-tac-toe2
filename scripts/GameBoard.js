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

    getBoard(){
        return this.board;
    }
};

export default GameBoard