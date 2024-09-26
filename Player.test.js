import Player from "./scripts/Player.js";

describe('Player', () => {
    test('initializes with correct properties', () => {
        const player = new Player('Alice', 'X');
        expect(player.name).toBe('Alice');
        expect(player.marker).toBe('X');
    });
});
