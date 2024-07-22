import Goblin from '../goblin';

describe('Goblin', () => {
  let goblin;

  beforeEach(() => {
    document.body.innerHTML = '<div id="goblin" class="hidden"></div>';
    goblin = new Goblin();
  });

  test('should show goblin in a random cell', () => {
    const cells = [document.createElement('div'), document.createElement('div')];
    goblin.show(cells);
    expect(goblin.element.classList.contains('hidden')).toBe(false);
    expect(cells.some(cell => cell.contains(goblin.element))).toBe(true);
  });

  test('should hide goblin', () => {
    goblin.show([document.createElement('div')]);
    goblin.hide();
    expect(goblin.element.classList.contains('hidden')).toBe(true);
    expect(goblin.element.parentElement).toBeNull();
  });

  test('should not throw error if hide is called when goblin is not in a cell', () => {
    goblin.hide();
    expect(goblin.element.classList.contains('hidden')).toBe(true);
  });

  test('should handle case when goblin element is not found', () => {
    document.body.innerHTML = '';
    goblin = new Goblin();
    expect(goblin.element).toBeNull();
  });
});
