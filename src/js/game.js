import Goblin from './goblin';

export default class Game {
  constructor() {
    this.boardSize = 4;
    this.cells = [];
    this.score = 0;
    this.attempts = 0;
    this.maxAttempts = 6;
    this.goblin = new Goblin();
    this.gameBoard = document.querySelector('.game-board');
    this.startButton = document.getElementById('start-button');
    this.message = document.getElementById('message');
  }

  init() {
    this.createBoard();
    if (this.startButton) {
      this.startButton.addEventListener('click', () => this.startGame());
    }
  }

  createBoard() {
    if (!this.gameBoard) return;
    for (let i = 0; i < this.boardSize; i++) {
      for (let j = 0; j < this.boardSize; j++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        this.gameBoard.appendChild(cell);
        this.cells.push(cell);
      }
    }
  }

  startGame() {
    this.resetGame();
    this.interval = setInterval(() => this.moveGoblin(), 1000);
    document.body.classList.add('hammer-cursor');
  }

  resetGame() {
    this.score = 0;
    this.attempts = 0;
    if (this.message) {
      this.message.textContent = '';
    }
    if (this.startButton) {
      this.startButton.style.display = 'none';
    }
    this.goblin.hide();
  }

  moveGoblin() {
    if (this.attempts >= this.maxAttempts) {
      this.endGame();
      return;
    }

    this.goblin.hide();
    this.goblin.show(this.cells);

    if (this.goblin.element) {
      this.goblin.element.onclick = () => {
        this.score++;
        this.goblin.hide();
      };
    }

    this.attempts++;
  }

  endGame() {
    clearInterval(this.interval);
    if (this.message) {
      if (this.score >= 5) {
        this.message.textContent = `Вы выиграли! Ваш счет: ${this.score} 😊`;
      } else {
        this.message.textContent = `Вы проиграли! Ваш счет: ${this.score} 😢`;
      }
    }
    if (this.startButton) {
      this.startButton.style.display = 'block';
    }
    document.body.classList.remove('hammer-cursor');
    this.goblin.hide();
  }
}
