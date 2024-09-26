import PlayerManager from "./scripts/PlayerManager.js";

describe('PlayerManager', () => {
    test('initializes with two players', () => {
        const manager = new PlayerManager('Alice', 'Bob');
        expect(manager.playerOne.name).toBe('Alice');
        expect(manager.playerTwo.name).toBe('Bob');
    });

    test('starts with player one as current player', () => {
        const manager = new PlayerManager('Alice', 'Bob');
        expect(manager.getCurrentPlayer().name).toBe('Alice');
    });

    test('switches current player', () => {
        const manager = new PlayerManager('Alice', 'Bob');
        manager.switchPlayer();
        expect(manager.getCurrentPlayer().name).toBe('Bob');
        manager.switchPlayer();
        expect(manager.getCurrentPlayer().name).toBe('Alice');
    });
});
