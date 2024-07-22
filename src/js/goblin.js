export default class Goblin {
  constructor() {
    this.element = document.getElementById('goblin');
  }

  show(cells) {
    const randomIndex = Math.floor(Math.random() * cells.length);
    cells[randomIndex].appendChild(this.element);
    this.element.classList.remove('hidden');
  }

  hide() {
    if (this.element.parentElement) {
      this.element.parentElement.removeChild(this.element);
    }
    this.element.classList.add('hidden');
  }
}
