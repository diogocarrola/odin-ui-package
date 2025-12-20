require('whatwg-fetch');

// Setup basic DOM for testing (jsdom provides document)
global.document.body.innerHTML = `
    <div id="test-dropdown"></div>
    <div id="test-carousel"></div>
    <form id="test-form"></form>
`;