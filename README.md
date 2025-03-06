# HTML to SVG Converter

A simple tool to convert HTML content to SVG format. This tool is useful for creating static vector graphics from HTML elements.

## Online Version

You can use the online version of this tool at: 
[https://yuuta12-maker.github.io/html-svg-converter/web/](https://yuuta12-maker.github.io/html-svg-converter/web/)

## Features

- Convert HTML elements to SVG
- Maintain styling and layout
- Support for basic HTML elements
- Command line interface
- Browser-based web interface

## Installation

### Node.js Package

```bash
npm install html-svg-converter
```

### Web Version

To use the web version locally:

1. Clone this repository
2. Open the `web/index.html` file in your browser

## Usage

### Node.js API

```javascript
const { htmlToSvg } = require('html-svg-converter');

const htmlContent = `
  <div style="display: flex; align-items: center;">
    <h1 style="color: blue;">Hello World</h1>
    <p style="margin-left: 10px;">This is a test</p>
  </div>
`;

const svgContent = htmlToSvg(htmlContent);
console.log(svgContent);
```

### Command Line Usage

```bash
html-svg-converter input.html output.svg
```

### Web Interface

1. Enter your HTML code in the input textarea
2. Configure width, height, and other options
3. Click "Convert to SVG"
4. View the result, download, or copy the SVG code

## API Reference

### htmlToSvg(htmlContent, options)

Converts HTML content to SVG.

- `htmlContent` (string): The HTML content to convert
- `options` (object): Configuration options
  - `width` (number): Width of the output SVG
  - `height` (number): Height of the output SVG
  - `preserveAspectRatio` (boolean): Whether to preserve the aspect ratio

Returns: SVG content as a string

## Browser Support

The web version works in all modern browsers:

- Chrome
- Firefox
- Safari
- Edge

## License

MIT
