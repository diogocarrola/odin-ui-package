console.log('Odin UI Demo loaded');

// This will initialize components once they're implemented
document.addEventListener('DOMContentLoaded', function() {
    console.log('Demo ready - initializing components');
    try {
        if (window.OdinUI && OdinUI.createDropdown) {
            OdinUI.createDropdown('.odin-dropdown');
        }
    } catch (e) { console.warn('Dropdown init failed', e); }

    try {
        if (window.OdinUI && OdinUI.createCarousel) {
            // initialize carousel with autoplay disabled for demo accessibility
            OdinUI.createCarousel('.odin-carousel', { autoplay: false });
        }
    } catch (e) { console.warn('Carousel init failed', e); }

    try {
        if (window.OdinUI && OdinUI.createFormValidator) {
            OdinUI.createFormValidator('#demo-form', { validateOnInput: true });
        }
    } catch (e) { console.warn('FormValidator init failed', e); }

    console.log('Components initialized (if available)');
});