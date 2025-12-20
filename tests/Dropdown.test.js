const { Dropdown } = require('../src/components/Dropdown/Dropdown.js');

describe('Dropdown', () => {
  let container;
  let dropdown;

  beforeEach(() => {
    container = document.createElement('div');
    container.className = 'odin-dropdown';
    container.innerHTML = `
      <button class="odin-dropdown-toggle">Toggle</button>
      <div class="odin-dropdown-menu">
        <a href="#">Item 1</a>
      </div>
    `;
    document.body.appendChild(container);
    dropdown = new Dropdown(container);
  });

  afterEach(() => {
    dropdown.destroy();
    document.body.removeChild(container);
  });

  test('initializes and toggles menu', () => {
    const menu = container.querySelector('.odin-dropdown-menu');
    expect(menu.classList.contains('show')).toBe(false);
    dropdown.toggle();
    expect(menu.classList.contains('show')).toBe(true);
    dropdown.toggle();
    expect(menu.classList.contains('show')).toBe(false);
  });
});
