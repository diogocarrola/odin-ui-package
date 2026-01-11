let axeAvailable = true;
let axe, toHaveNoViolations;
try {
  ({ axe, toHaveNoViolations } = require('jest-axe'));
  expect.extend(toHaveNoViolations);
} catch (err) {
  axeAvailable = false;
  // eslint-disable-next-line no-console
  console.warn('jest-axe not installed — skipping axe accessibility test');
}

const { Dropdown } = require('../src/components/Dropdown/Dropdown.js');

describe('axe accessibility checks', () => {
  if (!axeAvailable) {
    test('jest-axe not installed — skip axe tests', () => {
      expect(true).toBe(true);
    });
    return;
  }

  test('dropdown demo has no axe violations', async () => {
    const container = document.createElement('div');
    container.className = 'odin-dropdown';
    container.innerHTML = `
      <button class="odin-dropdown-toggle">Toggle</button>
      <div class="odin-dropdown-menu">
        <a href="#">Item 1</a>
      </div>
    `;
    document.body.appendChild(container);
    new Dropdown(container);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
