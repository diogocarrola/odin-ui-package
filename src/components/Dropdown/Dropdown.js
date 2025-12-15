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
    this.init();
  }
  
  init() {
    if (!this.element) return;
    this.toggleBtn = this.element.querySelector('.odin-dropdown-toggle') || this.element;
    this.menu = this.element.querySelector('.odin-dropdown-menu');
    if (this.toggleBtn) this.toggleBtn.addEventListener('click', this._toggleHandler);
    if (this.options.closeOnClickOutside) document.addEventListener('click', this._onDocumentClick);
  }
  
  open() {
    if (this.menu) this.menu.classList.add('show');
    this.isOpen = true;
  }
  
  close() {
    if (this.menu) this.menu.classList.remove('show');
    this.isOpen = false;
  }
  
  toggle() {
    this.isOpen ? this.close() : this.open();
  }
  
  destroy() {
    if (this.toggleBtn) this.toggleBtn.removeEventListener('click', this._toggleHandler);
    document.removeEventListener('click', this._onDocumentClick);
  }

  _onDocumentClick(e) {
    if (!this.element) return;
    if (!this.element.contains(e.target) && this.isOpen) this.close();
  }
}