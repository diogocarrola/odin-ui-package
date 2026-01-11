// Main entry point for the package
export { Dropdown } from './components/Dropdown/Dropdown.js';
export { Carousel } from './components/Carousel/Carousel.js';
export { FormValidator } from './components/FormValidator/FormValidator.js';

// Import component styles so Rollup can bundle/extract CSS
import './components/Dropdown/dropdown.css';
import './components/Carousel/carousel.css';
import './components/FormValidator/formValidator.css';

// Factory functions for convenience
export function createDropdown(selector, options = {}) {
  const element = typeof selector === 'string' 
    ? document.querySelector(selector) 
    : selector;
  return new Dropdown(element, options);
}

export function createCarousel(selector, options = {}) {
  const element = typeof selector === 'string' 
    ? document.querySelector(selector) 
    : selector;
  return new Carousel(element, options);
}

export function createFormValidator(selector, options = {}) {
  const element = typeof selector === 'string' 
    ? document.querySelector(selector) 
    : selector;
  return new FormValidator(element, options);
}