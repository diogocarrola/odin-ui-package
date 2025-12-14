# Odin UI Components

[![npm version](https://img.shields.io/npm/v/odin-ui.svg)](https://www.npmjs.com/package/odin-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/diogocarrola/odin-ui-package.svg)](https://github.com/diogocarrola/odin-ui-package/stargazers)

A collection of reusable UI components built from The Odin Project curriculum. This package provides production-ready dropdowns, carousels and form validation utilities that you can easily integrate into your projects.

## 📦 Installation

```bash
npm install odin-ui
```

## 🚀 Quick Start

### ES6 Modules
```javascript
import { Dropdown, Carousel, FormValidator } from 'odin-ui';
```

### CommonJS
```javascript
const { Dropdown } = require('odin-ui');
```

### Browser (via CDN)
```html
<script src="https://unpkg.com/odin-ui"></script>
<script>
  const dropdown = OdinUI.createDropdown('#my-dropdown');
</script>
```

## ✨ Features

- **Dropdown**: Customizable dropdown menus with multiple trigger options
- **Carousel**: Responsive image carousel with navigation controls
- **FormValidator**: Real-time form validation with custom rules

## 🏗️ Project Structure


```
odin-ui-package/
├── src/
│   ├── components/
│   │   ├── Dropdown/
│   │   │   ├── Dropdown.js      # Component logic & export
│   │   │   └── dropdown.css     # Component styles
│   │   ├── Carousel/
│   │   │   ├── Carousel.js      # Component logic & export
│   │   │   └── carousel.css     # Component styles
│   │   └── FormValidator/
│   │       ├── FormValidator.js # Component logic & export
│   │       └── formValidator.css # Component styles
│   └── index.js                 # Main entry point
├── demo/
├── dist/                        # Built files
├── tests/                       # Test files
└── package.json
```

## 🔧 Development

Clone the repository:

```bash
git clone https://github.com/diogocarrola/odin-ui-package.git
cd odin-ui-package
```

Install dependencies:

```bash
npm install
```

Build the project:

```bash
npm run build
```

Run tests:

```bash
npm test
```

Start demo server:

```bash
npm run demo
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.