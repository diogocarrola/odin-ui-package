export class Carousel {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      autoplay: options.autoplay || false,
      interval: options.interval || 5000,
      showControls: options.showControls !== false,
      showIndicators: options.showIndicators !== false,
      ...options
    };
    
    this.currentSlide = 0;
    this.slides = [];
    this._timer = null;
    this._onVisibilityChange = this._onVisibilityChange.bind(this);
    this.init();
  }
  
  init() {
    if (!this.element) return;
    // Find slides (support different markup)
    this.slides = Array.from(this.element.querySelectorAll('.carousel-slide'));
    if (this.slides.length === 0) this.slides = Array.from(this.element.querySelectorAll('.slide'));
    this.updateSlides();
    if (this.options.autoplay) this.play();
    document.addEventListener('visibilitychange', this._onVisibilityChange);
  }
  
  next() {
    if (this.slides.length === 0) return;
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.updateSlides();
  }
  
  prev() {
    if (this.slides.length === 0) return;
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.updateSlides();
  }
  
  goToSlide(index) {
    if (this.slides.length === 0) return;
    const i = Math.max(0, Math.min(index, this.slides.length - 1));
    this.currentSlide = i;
    this.updateSlides();
  }
  
  play() {
    if (this._timer) return;
    this._timer = setInterval(() => this.next(), this.options.interval);
  }
  
  pause() {
    if (this._timer) {
      clearInterval(this._timer);
      this._timer = null;
    }
  }
  
  destroy() {
    this.pause();
    document.removeEventListener('visibilitychange', this._onVisibilityChange);
  }

  updateSlides() {
    this.slides.forEach((s, i) => {
      s.classList.toggle('active', i === this.currentSlide);
    });
  }

  _onVisibilityChange() {
    if (document.hidden) this.pause(); else if (this.options.autoplay) this.play();
  }
}