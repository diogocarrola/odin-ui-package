const { FormValidator } = require('../src/components/FormValidator/FormValidator.js');

describe('FormValidator', () => {
  let form;
  let validator;

  beforeEach(() => {
    form = document.createElement('form');
    form.innerHTML = `
      <input type="email" name="email" required />
    `;
    document.body.appendChild(form);
    validator = new FormValidator(form, { validateOnInput: false });
  });

  afterEach(() => {
    validator.destroy();
    document.body.removeChild(form);
  });

  test('empty required field fails validation', () => {
    expect(validator.validate()).toBe(false);
  });

  test('valid email passes validation', () => {
    const input = form.querySelector('input');
    input.value = 'test@example.com';
    expect(validator.validate()).toBe(true);
  });
});
