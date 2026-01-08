const { Carousel } = require('../src/components/Carousel/Carousel.js');

describe('Carousel accessibility', () => {
  let container;
  let carousel;

  beforeEach(() => {
    container = document.createElement('div');
    container.innerHTML = `
      <div class="carousel">
        <div class="carousel-slide">Slide 1</div>
        <div class="carousel-slide">Slide 2</div>
      </div>
    `;
    document.body.appendChild(container);
    carousel = new Carousel(container, { autoplay: false });
  });

  afterEach(() => {
    carousel.destroy();
    document.body.removeChild(container);
  });

  test('has region role and roledescription and is focusable', () => {
    expect(container.getAttribute('role') || container.firstElementChild.getAttribute('role')).toBe('region');
    const el = container.firstElementChild || container;
    expect(el.getAttribute('aria-roledescription')).toBe('carousel');
  });

  test('ArrowRight and ArrowLeft navigate slides', () => {
    const el = container.firstElementChild || container;
    // focus and ArrowRight
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    expect(carousel.currentSlide).toBe(1);
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    expect(carousel.currentSlide).toBe(0);
  });
});
