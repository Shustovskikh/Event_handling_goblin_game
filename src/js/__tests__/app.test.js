import Game from '../game';

jest.mock('../game');

describe('app.js', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="game-board"></div>
      <button id="start-button">Start</button>
      <div id="message"></div>
      <div id="goblin" class="hidden"></div>
    `;
  });

  test('should initialize game on DOMContentLoaded', () => {
    require('../app');
    document.dispatchEvent(new Event('DOMContentLoaded'));
    expect(Game).toHaveBeenCalled();
    const gameInstance = Game.mock.instances[0];
    expect(gameInstance.init).toHaveBeenCalled();
  });
});
