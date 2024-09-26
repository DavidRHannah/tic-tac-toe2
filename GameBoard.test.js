import GameBoard from "./scripts/GameBoard.js";

describe('GameBoard', () => {
    test('initializes with an empty board', () => {
        const board = new GameBoard();
        expect(board.getBoard()).toEqual(Array(9).fill('-'));
    });

    test('marks the board correctly', () => {
        const board = new GameBoard();
        board.mark(1, 1, 'X');
        expect(board.getBoard()[0]).toBe('X');
    });

    test('does not allow marking an already marked cell', () => {
        const board = new GameBoard();
        board.mark(1, 1, 'X');
        const result = board.mark(1, 1, 'O');
        expect(result).toBe(false);
    });

    test('correctly converts row/col to index', () => {
        const board = new GameBoard();
        expect(board.rowColToIndex(1, 1)).toBe(0);
        expect(board.rowColToIndex(2, 3)).toBe(5);
        expect(board.rowColToIndex(3, 1)).toBe(6);
    });

    test('returns false for out-of-bounds index', () => {
        const board = new GameBoard();
        expect(board.rowColToIndex(0, 1)).toBe(false);
        expect(board.rowColToIndex(4, 1)).toBe(false);
        expect(board.rowColToIndex(1, 0)).toBe(false);
        expect(board.rowColToIndex(1, 4)).toBe(false);
    });
});
