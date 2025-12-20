const { Carousel } = require('../src/components/Carousel/Carousel.js');

describe('Carousel', () => {
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

  test('initial slide is index 0', () => {
    expect(carousel.currentSlide).toBe(0);
    const slides = container.querySelectorAll('.carousel-slide');
    expect(slides[0].classList.contains('active')).toBe(true);
  });

  test('next and prev change slides', () => {
    carousel.next();
    expect(carousel.currentSlide).toBe(1);
    carousel.prev();
    expect(carousel.currentSlide).toBe(0);
  });
});
