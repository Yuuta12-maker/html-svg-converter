'use strict';

const { htmlToSvg } = require('../index');

describe('HTML to SVG Converter', () => {
  test('should convert basic HTML to SVG', () => {
    const html = '<div><h1>Hello World</h1></div>';
    const svg = htmlToSvg(html);
    
    // Basic validation
    expect(svg).toContain('<svg');
    expect(svg).toContain('</svg>');
    expect(svg).toContain('Hello World');
  });
  
  test('should apply custom width and height', () => {
    const html = '<div>Test</div>';
    const svg = htmlToSvg(html, { width: 1000, height: 500 });
    
    expect(svg).toContain('width="1000"');
    expect(svg).toContain('height="500"');
  });
  
  test('should handle nested elements', () => {
    const html = `
      <div>
        <h1>Title</h1>
        <p>Paragraph <span>with span</span></p>
      </div>
    `;
    const svg = htmlToSvg(html);
    
    expect(svg).toContain('Title');
    expect(svg).toContain('Paragraph');
    expect(svg).toContain('with span');
  });
  
  test('should handle preserveAspectRatio option', () => {
    const html = '<div>Test</div>';
    const svgWithPreserve = htmlToSvg(html, { preserveAspectRatio: true });
    const svgWithoutPreserve = htmlToSvg(html, { preserveAspectRatio: false });
    
    expect(svgWithPreserve).toContain('preserveAspectRatio');
    expect(svgWithoutPreserve).not.toContain('preserveAspectRatio');
  });
});
