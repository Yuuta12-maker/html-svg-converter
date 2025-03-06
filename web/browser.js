/**
 * Browser-compatible version of HTML to SVG converter
 */

(function(global) {
  'use strict';

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
    
    // Create a temporary container to parse the HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const body = doc.body;
    
    // Create SVG document
    const svgNS = 'http://www.w3.org/2000/svg';
    const svgElement = document.createElementNS(svgNS, 'svg');
    svgElement.setAttribute('xmlns', svgNS);
    svgElement.setAttribute('width', mergedOptions.width);
    svgElement.setAttribute('height', mergedOptions.height);
    svgElement.setAttribute('version', '1.1');
    
    if (mergedOptions.preserveAspectRatio) {
      svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    }
    
    // Process HTML elements and convert to SVG
    processNode(body, svgElement);

    // Return SVG as a string
    const serializer = new XMLSerializer();
    return serializer.serializeToString(svgElement);
  }

  /**
   * Process an HTML node and convert it to SVG elements
   * @param {Node} htmlNode - The HTML node to process
   * @param {SVGElement} svgParent - The SVG parent element
   */
  function processNode(htmlNode, svgParent) {
    if (htmlNode.nodeType === Node.TEXT_NODE) { // Text node
      if (htmlNode.textContent.trim()) {
        const svgNS = 'http://www.w3.org/2000/svg';
        const text = document.createElementNS(svgNS, 'text');
        text.textContent = htmlNode.textContent.trim();
        
        // Apply basic text positioning
        text.setAttribute('x', '0');
        text.setAttribute('y', '20');
        text.setAttribute('font-family', 'Arial, sans-serif');
        text.setAttribute('font-size', '14px');
        
        svgParent.appendChild(text);
      }
      return;
    }
    
    if (htmlNode.nodeType !== Node.ELEMENT_NODE) return; // Skip if not an element node
    
    // Handle different HTML elements
    const tagName = htmlNode.tagName.toLowerCase();
    const svgNS = 'http://www.w3.org/2000/svg';
    
    // Create a group for the element
    const group = document.createElementNS(svgNS, 'g');
    
    // Apply styles from the HTML element to the SVG group
    applyStyles(htmlNode, group);
    
    // Handle specific HTML elements
    switch (tagName) {
      case 'div':
        // Create a rect to represent the div
        const rect = document.createElementNS(svgNS, 'rect');
        rect.setAttribute('width', '100%');
        rect.setAttribute('height', '100%');
        rect.setAttribute('fill', 'transparent');
        group.appendChild(rect);
        break;
        
      case 'img':
        // Create an image element
        const img = document.createElementNS(svgNS, 'image');
        img.setAttribute('href', htmlNode.getAttribute('src') || '');
        img.setAttribute('width', htmlNode.getAttribute('width') || '100');
        img.setAttribute('height', htmlNode.getAttribute('height') || '100');
        group.appendChild(img);
        break;
        
      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'h5':
      case 'h6':
        // These will be handled by their text children, but we can add specific handling here
        break;
        
      case 'p':
        // Paragraphs will also be handled by their text children
        break;
      
      // Add more element-specific handling as needed
    }
    
    // Process child nodes
    for (let i = 0; i < htmlNode.childNodes.length; i++) {
      processNode(htmlNode.childNodes[i], group);
    }
    
    svgParent.appendChild(group);
  }

  /**
   * Apply CSS styles from HTML element to SVG element
   * @param {Element} htmlElement - The HTML element
   * @param {SVGElement} svgElement - The SVG element
   */
  function applyStyles(htmlElement, svgElement) {
    const computedStyle = window.getComputedStyle(htmlElement);
    
    // Map CSS properties to SVG attributes
    const styleMap = {
      'color': 'fill',
      'backgroundColor': 'fill',
      'fontFamily': 'font-family',
      'fontSize': 'font-size',
      'fontWeight': 'font-weight',
      'textAlign': 'text-anchor', // approximation
      'opacity': 'opacity',
      // Add more style mappings as needed
    };
    
    // Apply mapped styles
    for (const [cssProperty, svgAttribute] of Object.entries(styleMap)) {
      const value = computedStyle[cssProperty];
      if (value && value !== '') {
        svgElement.setAttribute(svgAttribute, value);
      }
    }
    
    // Apply transform if available
    if (computedStyle.transform && computedStyle.transform !== 'none') {
      svgElement.setAttribute('transform', computedStyle.transform);
    }
  }

  // Expose the function globally
  global.htmlToSvg = htmlToSvg;
  
})(typeof window !== 'undefined' ? window : this);
