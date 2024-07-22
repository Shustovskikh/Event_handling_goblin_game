import Game from '../game';
import Goblin from '../goblin';

jest.mock('../goblin');

describe('Game', () => {
  let game;

  beforeEach(() => {
    document.body.innerHTML = `
      <div class="game-board"></div>
      <button id="start-button">Start</button>
      <div id="message"></div>
      <div id="goblin" class="hidden"></div>
    `;
    Goblin.mockImplementation(() => {
      return {
        element: document.getElementById('goblin'),
        show: jest.fn(),
        hide: jest.fn(),
      };
    });
    game = new Game();
    game.init();
  });

  test('should create game board', () => {
    expect(game.cells.length).toBe(16);
  });

  test('should start game on button click', () => {
    const startButton = document.getElementById('start-button');
    startButton.click();
    expect(game.score).toBe(0);
    expect(game.attempts).toBe(0);
    expect(document.body.classList.contains('hammer-cursor')).toBe(true);
  });

  test('should move goblin and increase score on click', () => {
    game.startGame();
    game.moveGoblin();
    const goblinElement = game.goblin.element;
    goblinElement.click();
    expect(game.score).toBe(1);
  });

  test('should end game after max attempts', () => {
    game.startGame();
    game.attempts = game.maxAttempts;
    game.moveGoblin();
    expect(game.message.textContent).toContain('Вы проиграли');
    expect(document.body.classList.contains('hammer-cursor')).toBe(false);
  });

  test('should display win message if score is 5 or more', () => {
    game.startGame();
    game.score = 5;
    game.attempts = game.maxAttempts;
    game.moveGoblin();
    expect(game.message.textContent).toContain('Вы выиграли');
  });

  test('should handle case when gameBoard is not found', () => {
    document.body.innerHTML = '';
    game = new Game();
    game.init();
    expect(game.cells.length).toBe(0);
  });

  test('should handle case when startButton is not found', () => {
    document.body.innerHTML = '<div class="game-board"></div>';
    game = new Game();
    game.init();
    expect(game.startButton).toBeNull();
  });

  test('should reset game correctly', () => {
    game.startGame();
    game.resetGame();
    expect(game.score).toBe(0);
    expect(game.attempts).toBe(0);
    expect(game.message.textContent).toBe('');
    expect(game.startButton.style.display).toBe('none');
    expect(game.goblin.hide).toHaveBeenCalled();
  });

  test('should clear interval on endGame', () => {
    jest.useFakeTimers();
    const clearIntervalSpy = jest.spyOn(global, 'clearInterval');
    game.startGame();
    game.endGame();
    expect(clearIntervalSpy).toHaveBeenCalledWith(game.interval);
    clearIntervalSpy.mockRestore();
    expect(game.goblin.hide).toHaveBeenCalled();
  });

  test('should hide goblin on resetGame', () => {
    game.startGame();
    game.resetGame();
    expect(game.goblin.hide).toHaveBeenCalled();
  });

  test('should hide goblin on endGame', () => {
    game.startGame();
    game.endGame();
    expect(game.goblin.hide).toHaveBeenCalled();
  });

  test('should not create board if gameBoard is not found', () => {
    document.body.innerHTML = '';
    game = new Game();
    game.createBoard();
    expect(game.cells.length).toBe(0);
  });

  test('should clear message text on resetGame', () => {
    game.startGame();
    game.resetGame();
    expect(game.message.textContent).toBe('');
  });

  test('should handle case when attempts are less than maxAttempts', () => {
    game.startGame();
    game.attempts = game.maxAttempts - 1;
    game.moveGoblin();
    expect(game.attempts).toBe(game.maxAttempts);
  });

  test('should handle case when attempts are equal to maxAttempts', () => {
    game.startGame();
    game.attempts = game.maxAttempts;
    game.moveGoblin();
    expect(game.message.textContent).toContain('Вы проиграли');
  });

  test('should end game if max attempts are reached', () => {
    game.startGame();
    game.attempts = game.maxAttempts;
    game.moveGoblin();
    expect(game.message.textContent).toContain('Вы проиграли');
    expect(document.body.classList.contains('hammer-cursor')).toBe(false);
  });

  test('should continue game if attempts are less than maxAttempts', () => {
    game.startGame();
    game.attempts = game.maxAttempts - 1;
    game.moveGoblin();
    expect(game.attempts).toBe(game.maxAttempts);
  });

  test('should increase score and hide goblin on goblin click', () => {
    game.startGame();
    game.moveGoblin();
    const goblinElement = game.goblin.element;
    goblinElement.click();
    expect(game.score).toBe(1);
    expect(game.goblin.hide).toHaveBeenCalled();
  });

  test('should not fail if goblin element is not found', () => {
    game.goblin.element = null;
    game.startGame();
    game.moveGoblin();
    expect(game.score).toBe(0);
  });

  test('should hide goblin on endGame', () => {
    game.startGame();
    game.endGame();
    expect(game.goblin.hide).toHaveBeenCalled();
  });

  test('should clear message text on resetGame if message exists', () => {
    game.startGame();
    game.resetGame();
    expect(game.message.textContent).toBe('');
  });

  test('should not fail if message does not exist on resetGame', () => {
    document.body.innerHTML = '<div class="game-board"></div><button id="start-button">Start</button>';
    game = new Game();
    game.init();
    game.startGame();
    game.resetGame();
    expect(game.message).toBeNull();
  });

  test('should display win message if score is 5 or more and message exists', () => {
    game.startGame();
    game.score = 5;
    game.attempts = game.maxAttempts;
    game.moveGoblin();
    expect(game.message.textContent).toContain('Вы выиграли');
  });

  test('should not fail if message does not exist on endGame', () => {
    document.body.innerHTML = '<div class="game-board"></div><button id="start-button">Start</button>';
    game = new Game();
    game.init();
    game.startGame();
    game.score = 5;
    game.attempts = game.maxAttempts;
    game.moveGoblin();
    expect(game.message).toBeNull();
  });
});
