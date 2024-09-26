class ArtificialOpponent {
    constructor(marker) {
        this.marker = marker;
        this.opponentMarker = marker === 'X' ? 'O' : 'X';
    }

    getBestMove(board) {
        let bestScore = -Infinity;
        let bestMove;

        for (let i = 0; i < board.length; i++) {
            if (board[i] === '-') {
                board[i] = this.marker;
                let score = this.minimax(board, 0, false);
                board[i] = '-';

                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
        }

        return bestMove;
    }

    minimax(board, depth, isMaximizing) {
        const scores = {
            'X': -1,
            'O': 1,
            'tie': 0
        };

        const winner = this.checkWinner(board);
        if (winner !== null) {
            return scores[winner];
        }

        if (isMaximizing) {
            let bestScore = -Infinity;

            for (let i = 0; i < board.length; i++) {
                if (board[i] === '-') {
                    board[i] = this.marker;
                    let score = this.minimax(board, depth + 1, false);
                    board[i] = '-';
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;

            for (let i = 0; i < board.length; i++) {
                if (board[i] === '-') {
                    board[i] = this.opponentMarker;
                    let score = this.minimax(board, depth + 1, true);
                    board[i] = '-';
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    }

    checkWinner(board) {
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

        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (board[a] === board[b] && board[a] === board[c] && board[a] !== '-') {
                return board[a];
            }
        }

        if (board.every(cell => cell !== '-')) {
            return 'tie';
        }

        return null;
    }
}

export default ArtificialOpponent;
