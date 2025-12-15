export class FormValidator {
  constructor(form, options = {}) {
    this.form = form;
    this.options = {
      validateOnInput: options.validateOnInput !== false,
      showErrorMessages: options.showErrorMessages !== false,
      customRules: options.customRules || {},
      ...options
    };
    
    this.errors = {};
    this._onSubmit = this._onSubmit.bind(this);
    this._onInput = this._onInput.bind(this);
    this.init();
  }
  
  init() {
    if (!this.form) return;
    this.form.addEventListener('submit', this._onSubmit);
    if (this.options.validateOnInput) this.form.addEventListener('input', this._onInput);
  }
  
  validate() {
    if (!this.form) return true;
    const elements = Array.from(this.form.querySelectorAll('[name]'));
    let valid = true;
    elements.forEach(el => {
      const fieldValid = this.validateField(el);
      if (!fieldValid) valid = false;
    });
    return valid;
  }
  
  validateField(field) {
    if (!field) return true;
    const value = field.value.trim();
    let valid = true;
    let message = '';

    if (field.hasAttribute('required') && value === '') {
      valid = false;
      message = 'This field is required';
    }

    if (valid && field.type === 'email' && value !== '') {
      // simple email check
      const re = /^\S+@\S+\.\S+$/;
      if (!re.test(value)) {
        valid = false;
        message = 'Enter a valid email';
      }
    }

    if (!valid) {
      this.showError(field, message);
    } else {
      this.hideError(field);
    }

    return valid;
  }
  
  showError(field, message) {
    if (!field) return;
    field.classList.add('error');
    let msg = field.nextElementSibling;
    if (!msg || !msg.classList.contains('error-message')) {
      msg = document.createElement('div');
      msg.className = 'error-message';
      field.parentNode.insertBefore(msg, field.nextSibling);
    }
    msg.textContent = message;
  }
  
  hideError(field) {
    if (!field) return;
    field.classList.remove('error');
    const msg = field.nextElementSibling;
    if (msg && msg.classList.contains('error-message')) msg.textContent = '';
  }
  
  destroy() {
    if (!this.form) return;
    this.form.removeEventListener('submit', this._onSubmit);
    this.form.removeEventListener('input', this._onInput);
  }

  _onSubmit(e) {
    if (!this.validate()) e.preventDefault();
  }

  _onInput(e) {
    const field = e.target;
    if (field && field.name) this.validateField(field);
  }
}