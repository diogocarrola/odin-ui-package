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
    this._onKeydown = this._onKeydown.bind(this);
    this._onFocusIn = this._onFocusIn.bind(this);
    this._onFocusOut = this._onFocusOut.bind(this);
    this.init();
  }

  init() {
    if (!this.element) return;
    // Find slides (support different markup and odin-prefixed classes)
    this.slides = Array.from(this.element.querySelectorAll('.carousel-slide, .odin-carousel-slide'));
    if (this.slides.length === 0) this.slides = Array.from(this.element.querySelectorAll('.slide'));
    this.updateSlides();
    if (this.options.autoplay) this.play();
    document.addEventListener('visibilitychange', this._onVisibilityChange);
    // accessibility: attach region to the element that holds slides
    this._root = this.element.querySelector('.carousel, .odin-carousel') || this.element;
    this._root.setAttribute('role', 'region');
    this._root.setAttribute('aria-roledescription', 'carousel');
    if (!this._root.hasAttribute('tabindex')) this._root.setAttribute('tabindex', '0');
    this._root.addEventListener('keydown', this._onKeydown);
    this._root.addEventListener('focusin', this._onFocusIn);
    this._root.addEventListener('focusout', this._onFocusOut);
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

  _onKeydown(e) {
    // Left / Right navigation
    if (e.key === 'ArrowLeft' || e.key === 'Left') {
      e.preventDefault();
      this.prev();
    } else if (e.key === 'ArrowRight' || e.key === 'Right') {
      e.preventDefault();
      this.next();
    } else if (e.key === ' ' || e.key === 'Spacebar' || e.key === 'Space') {
      // Space toggles pause/play
      e.preventDefault();
      if (this._timer) this.pause(); else this.play();
    }
  }

  _onFocusIn() {
    // pause autoplay while user interacts
    this._wasPlaying = !!this._timer;
    this.pause();
  }

  _onFocusOut() {
    if (this._wasPlaying) this.play();
    this._wasPlaying = false;
  }

  updateSlides() {
    this.slides.forEach((s, i) => {
      s.classList.toggle('active', i === this.currentSlide);
      // accessibility: announce which slide is current
      if (i === this.currentSlide) {
        s.setAttribute('aria-hidden', 'false');
        s.setAttribute('aria-current', 'true');
      } else {
        s.setAttribute('aria-hidden', 'true');
        s.removeAttribute('aria-current');
      }
    });
  }

  _onVisibilityChange() {
    if (document.hidden) this.pause(); else if (this.options.autoplay) this.play();
  }

  destroy() {
    this.pause();
    document.removeEventListener('visibilitychange', this._onVisibilityChange);
    this.element.removeEventListener('keydown', this._onKeydown);
    this.element.removeEventListener('focusin', this._onFocusIn);
    this.element.removeEventListener('focusout', this._onFocusOut);
  }
}
