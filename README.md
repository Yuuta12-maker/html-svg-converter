# HTML to SVG Converter

A simple tool to convert HTML content to SVG format. This tool is useful for creating static vector graphics from HTML elements.

## Features

- Convert HTML elements to SVG
- Maintain styling and layout
- Support for basic HTML elements
- Command line interface

## Installation

```bash
npm install html-svg-converter
```

## Usage

### Basic Usage

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

## API Reference

### htmlToSvg(htmlContent, options)

Converts HTML content to SVG.

- `htmlContent` (string): The HTML content to convert
- `options` (object): Configuration options
  - `width` (number): Width of the output SVG
  - `height` (number): Height of the output SVG
  - `preserveAspectRatio` (boolean): Whether to preserve the aspect ratio

Returns: SVG content as a string

## License

MIT
