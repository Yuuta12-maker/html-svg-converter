'use strict';

const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { DOMImplementation, XMLSerializer } = require('xmldom');

/**
 * Convert HTML content to SVG
 * @param {string} htmlContent - The HTML content to convert
 * @param {Object} options - Configuration options
 * @param {number} [options.width=800] - Width of the output SVG
 * @param {number} [options.height=600] - Height of the output SVG
 * @param {boolean} [options.preserveAspectRatio=true] - Whether to preserve the aspect ratio
 * @returns {string} - SVG content
 */
function htmlToSvg(htmlContent, options = {}) {
  const defaultOptions = {
    width: 800,
    height: 600,
    preserveAspectRatio: true
  };

  const mergedOptions = { ...defaultOptions, ...options };
  
  // Parse HTML content
  const dom = new JSDOM(htmlContent);
  const document = dom.window.document;
  const body = document.body;

  // Create SVG document
  const implementation = new DOMImplementation();
  const svgDoc = implementation.createDocument('http://www.w3.org/2000/svg', 'svg', null);
  
  // Create root SVG element
  const svgRoot = svgDoc.documentElement;
  svgRoot.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svgRoot.setAttribute('width', mergedOptions.width);
  svgRoot.setAttribute('height', mergedOptions.height);
  
  if (mergedOptions.preserveAspectRatio) {
    svgRoot.setAttribute('preserveAspectRatio', 'xMidYMid meet');
  }
  
  // Process HTML elements and convert to SVG
  processNode(body, svgRoot, svgDoc);

  // Serialize SVG to string
  const serializer = new XMLSerializer();
  return serializer.serializeToString(svgDoc);
}

/**
 * Process an HTML node and convert it to SVG elements
 * @param {Node} htmlNode - The HTML node to process
 * @param {SVGElement} svgParent - The SVG parent element
 * @param {Document} svgDoc - The SVG document
 */
function processNode(htmlNode, svgParent, svgDoc) {
  if (htmlNode.nodeType === 3) { // Text node
    const text = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.textContent = htmlNode.textContent.trim();
    
    // Apply basic text positioning
    text.setAttribute('x', '0');
    text.setAttribute('y', '20');
    text.setAttribute('font-family', 'Arial, sans-serif');
    text.setAttribute('font-size', '14px');
    
    svgParent.appendChild(text);
    return;
  }
  
  if (htmlNode.nodeType !== 1) return; // Skip if not an element node
  
  // Handle different HTML elements
  const tagName = htmlNode.tagName.toLowerCase();
  
  // Create a group for the element
  const group = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'g');
  
  // Apply styles from the HTML element to the SVG group
  applyStyles(htmlNode, group);
  
  // Handle specific HTML elements
  switch (tagName) {
    case 'div':
      // Create a rect to represent the div
      const rect = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('width', '100%');
      rect.setAttribute('height', '100%');
      rect.setAttribute('fill', 'transparent');
      group.appendChild(rect);
      break;
      
    case 'img':
      // Create an image element
      const img = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'image');
      img.setAttribute('href', htmlNode.getAttribute('src') || '');
      img.setAttribute('width', htmlNode.getAttribute('width') || '100');
      img.setAttribute('height', htmlNode.getAttribute('height') || '100');
      group.appendChild(img);
      break;
      
    // Add more element-specific handling as needed
  }
  
  // Process child nodes
  for (const childNode of htmlNode.childNodes) {
    processNode(childNode, group, svgDoc);
  }
  
  svgParent.appendChild(group);
}

/**
 * Apply CSS styles from HTML element to SVG element
 * @param {Element} htmlElement - The HTML element
 * @param {SVGElement} svgElement - The SVG element
 */
function applyStyles(htmlElement, svgElement) {
  const computedStyle = htmlElement.style || {};
  
  // Map CSS properties to SVG attributes
  const styleMap = {
    'color': 'fill',
    'background-color': 'fill',
    'font-family': 'font-family',
    'font-size': 'font-size',
    'font-weight': 'font-weight',
    'text-align': 'text-anchor', // approximation
    'opacity': 'opacity',
    // Add more style mappings as needed
  };
  
  // Apply mapped styles
  for (const [cssProperty, svgAttribute] of Object.entries(styleMap)) {
    const value = computedStyle[cssProperty];
    if (value) {
      svgElement.setAttribute(svgAttribute, value);
    }
  }
  
  // Apply transform if available
  if (computedStyle.transform) {
    svgElement.setAttribute('transform', computedStyle.transform);
  }
}

module.exports = {
  htmlToSvg
};
