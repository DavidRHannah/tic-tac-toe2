import Game from './scripts/Game.js';

describe('Game', () => {
  test('detects a win correctly', () => {
      const game = new Game();
      
      game.board.mark(1, 1, 'X');
      game.board.mark(1, 2, 'X');
      game.board.mark(1, 3, 'X'); 

      expect(game.isOver()).toBe(true);
  });

  test('switches players correctly', () => {
      const game = new Game();
      const currentPlayer = game.playerManager.getCurrentPlayer().name;

      game.board.mark(1, 1, 'X'); 
      game.turnCount++;
      game.playerManager.switchPlayer(); 

      expect(game.playerManager.getCurrentPlayer().name).not.toBe(currentPlayer); 
  });

  test('does not allow marking an already marked cell', () => {
      const game = new Game();
      game.board.mark(1, 1, 'X'); 
      const result = game.board.mark(1, 1, 'O');
      expect(result).toBe(false);
  });

  test('ends game on a draw', () => {
      const game = new Game();
      const moves = [
          [1, 1, 'X'], [1, 2, 'O'], [1, 3, 'X'],
          [2, 1, 'O'], [2, 2, 'X'], [2, 3, 'O'],
          [3, 1, 'X'], [3, 2, 'O'], [3, 3, 'X']
      ];

      moves.forEach(([row, col, marker]) => {
          game.board.mark(row, col, marker);
          game.turnCount++;
          if (game.turnCount < 9) {
              game.playerManager.switchPlayer();
          }
      });

      expect(game.isOver()).toBe(true);
  });
});
