export class Dropdown {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      trigger: options.trigger || 'click',
      closeOnClickOutside: options.closeOnClickOutside !== false,
      animation: options.animation !== false,
      ...options
    };
    
    this.isOpen = false;
    this._toggleHandler = this.toggle.bind(this);
    this._onDocumentClick = this._onDocumentClick.bind(this);
    this._onToggleKeydown = this._onToggleKeydown.bind(this);
    this._onMenuKeydown = this._onMenuKeydown.bind(this);
    this.init();
  }
  
  init() {
    if (!this.element) return;
    this.toggleBtn = this.element.querySelector('.odin-dropdown-toggle') || this.element;
    this.menu = this.element.querySelector('.odin-dropdown-menu');
    // accessibility: ensure menu has id and aria attributes on toggle
    if (this.menu && !this.menu.id) this.menu.id = `odin-dropdown-${Math.random().toString(36).slice(2,9)}`;
    if (this.toggleBtn) {
      this.toggleBtn.setAttribute('aria-haspopup', 'true');
      this.toggleBtn.setAttribute('aria-expanded', String(this.isOpen));
      if (this.menu) this.toggleBtn.setAttribute('aria-controls', this.menu.id);
      this.toggleBtn.addEventListener('click', this._toggleHandler);
      this.toggleBtn.addEventListener('keydown', this._onToggleKeydown);
    }

    if (this.menu) {
      this.menu.setAttribute('role', 'menu');
      this.menu.addEventListener('keydown', this._onMenuKeydown);
    }

    if (this.options.closeOnClickOutside) document.addEventListener('click', this._onDocumentClick);
  }
  
  open() {
    if (this.menu) this.menu.classList.add('show');
    this.isOpen = true;
    if (this.toggleBtn) this.toggleBtn.setAttribute('aria-expanded', 'true');
    // focus first focusable item in menu
    if (this.menu) {
      const items = this._getMenuItems();
      if (items.length) items[0].focus();
    }
  }
  
  close() {
    if (this.menu) this.menu.classList.remove('show');
    this.isOpen = false;
    if (this.toggleBtn) this.toggleBtn.setAttribute('aria-expanded', 'false');
    if (this.toggleBtn) this.toggleBtn.focus();
  }
  
  toggle() {
    this.isOpen ? this.close() : this.open();
  }
  
  destroy() {
    if (this.toggleBtn) {
      this.toggleBtn.removeEventListener('click', this._toggleHandler);
      this.toggleBtn.removeEventListener('keydown', this._onToggleKeydown);
    }
    if (this.menu) {
      this.menu.removeEventListener('keydown', this._onMenuKeydown);
    }
    document.removeEventListener('click', this._onDocumentClick);
  }

  _onDocumentClick(e) {
    if (!this.element) return;
    if (!this.element.contains(e.target) && this.isOpen) this.close();
  }

  _getMenuItems() {
    if (!this.menu) return [];
    return Array.from(this.menu.querySelectorAll('a, button, [role="menuitem"]')).filter(i => !i.hasAttribute('disabled'));
  }

  _onToggleKeydown(e) {
    // Open on ArrowDown or Space/Enter
    if (e.key === 'ArrowDown' || e.key === 'Down') {
      e.preventDefault();
      this.open();
    } else if (e.key === 'Escape' || e.key === 'Esc') {
      e.preventDefault();
      this.close();
    }
  }

  _onMenuKeydown(e) {
    const items = this._getMenuItems();
    if (!items.length) return;
    const idx = items.indexOf(document.activeElement);
    if (e.key === 'ArrowDown' || e.key === 'Down') {
      e.preventDefault();
      const next = items[(idx + 1) % items.length];
      next.focus();
    } else if (e.key === 'ArrowUp' || e.key === 'Up') {
      e.preventDefault();
      const prev = items[(idx - 1 + items.length) % items.length];
      prev.focus();
    } else if (e.key === 'Escape' || e.key === 'Esc') {
      e.preventDefault();
      this.close();
    }
  }
}