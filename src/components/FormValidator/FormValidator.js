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

    // required
    if (field.hasAttribute('required') && value === '') {
      valid = false;
      message = 'This field is required';
    }

    // minlength / maxlength
    const min = field.getAttribute('minlength');
    const max = field.getAttribute('maxlength');
    if (valid && min && value.length < parseInt(min, 10)) {
      valid = false;
      message = `Please enter at least ${min} characters`;
    }
    if (valid && max && value.length > parseInt(max, 10)) {
      valid = false;
      message = `Please enter no more than ${max} characters`;
    }

    // pattern
    const pattern = field.getAttribute('pattern');
    if (valid && pattern && value !== '') {
      const re = new RegExp(pattern);
      if (!re.test(value)) {
        valid = false;
        message = 'Invalid format';
      }
    }

    // email
    if (valid && field.type === 'email' && value !== '') {
      const re = /^\S+@\S+\.\S+$/;
      if (!re.test(value)) {
        valid = false;
        message = 'Enter a valid email';
      }
    }

    // data-match (confirm password)
    const matchSelector = field.dataset.match;
    if (valid && matchSelector) {
      const other = this.form.querySelector(matchSelector);
      if (other && other.value.trim() !== value) {
        valid = false;
        message = 'Fields do not match';
      }
    }

    // custom rule by data-rule attribute
    const rule = field.dataset.rule;
    if (valid && rule && this.options.customRules[rule]) {
      const res = this.options.customRules[rule](value, field);
      if (res !== true) {
        valid = false;
        message = typeof res === 'string' ? res : 'Invalid value';
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
    // mark parent control
    const control = field.closest('.odin-form-control') || field.parentNode;
    control.classList.add('error');

    // create or reuse message element with accessible attributes
    let msg = control.querySelector('.odin-error-message');
    if (!msg) {
      msg = document.createElement('div');
      msg.className = 'odin-error-message';
      msg.setAttribute('role', 'alert');
      control.appendChild(msg);
    }
    // ensure unique id for aria-describedby
    if (!msg.id) msg.id = `error-${Math.random().toString(36).slice(2,9)}`;
    field.setAttribute('aria-invalid', 'true');
    field.setAttribute('aria-describedby', msg.id);
    msg.textContent = message;
  }
  
  hideError(field) {
    if (!field) return;
    const control = field.closest('.odin-form-control') || field.parentNode;
    control.classList.remove('error');
    field.removeAttribute('aria-invalid');
    const msg = control.querySelector('.odin-error-message');
    if (msg) {
      msg.textContent = '';
      field.removeAttribute('aria-describedby');
    }
  }
  
  destroy() {
    if (!this.form) return;
    this.form.removeEventListener('submit', this._onSubmit);
    this.form.removeEventListener('input', this._onInput);
  }

  // allow adding custom rule at runtime
  addRule(name, fn) {
    if (!name || typeof fn !== 'function') return;
    this.options.customRules[name] = fn;
  }

  _onSubmit(e) {
    if (!this.validate()) e.preventDefault();
  }

  _onInput(e) {
    const field = e.target;
    if (field && field.name) this.validateField(field);
  }
}