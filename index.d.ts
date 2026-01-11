export class Dropdown {
  constructor(element: Element | string, options?: any);
  toggle(): void;
  open(): void;
  close(): void;
  destroy(): void;
}

export class Carousel {
  constructor(element: Element | string, options?: any);
  next(): void;
  prev(): void;
  goToSlide(index: number): void;
  play(): void;
  pause(): void;
  destroy(): void;
}

export class FormValidator {
  constructor(form: HTMLFormElement | string, options?: any);
  validate(): boolean;
  validateField(field: Element): boolean;
  destroy(): void;
}

export function createDropdown(selector: string | Element, options?: any): Dropdown;
export function createCarousel(selector: string | Element, options?: any): Carousel;
export function createFormValidator(selector: string | Element, options?: any): FormValidator;
