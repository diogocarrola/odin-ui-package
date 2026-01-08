const { Dropdown } = require('../src/components/Dropdown/Dropdown.js');

describe('Dropdown accessibility', () => {
  let container;
  let dropdown;

  beforeEach(() => {
    container = document.createElement('div');
    container.className = 'odin-dropdown';
    container.innerHTML = `
      <button class="odin-dropdown-toggle">Toggle</button>
      <div class="odin-dropdown-menu">
        <a href="#">Item 1</a>
        <a href="#">Item 2</a>
      </div>
    `;
    document.body.appendChild(container);
    dropdown = new Dropdown(container);
  });

  afterEach(() => {
    dropdown.destroy();
    document.body.removeChild(container);
  });

  test('toggle has aria attributes', () => {
    const btn = container.querySelector('.odin-dropdown-toggle');
    expect(btn.getAttribute('aria-haspopup')).toBe('true');
    expect(btn.getAttribute('aria-expanded')).toBe('false');
    const menu = container.querySelector('.odin-dropdown-menu');
    expect(btn.getAttribute('aria-controls')).toBe(menu.id);
  });

  test('ArrowDown opens and focuses first item; Escape closes', () => {
    const btn = container.querySelector('.odin-dropdown-toggle');
    const menu = container.querySelector('.odin-dropdown-menu');
    // ArrowDown on toggle opens
    btn.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    expect(menu.classList.contains('show')).toBe(true);
    // first item should be focused
    const first = menu.querySelectorAll('a')[0];
    expect(document.activeElement).toBe(first);
    // ArrowDown inside menu moves focus
    first.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    const second = menu.querySelectorAll('a')[1];
    expect(document.activeElement).toBe(second);
    // Escape closes and focus returns to toggle
    second.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    expect(menu.classList.contains('show')).toBe(false);
    expect(document.activeElement).toBe(btn);
  });
});
