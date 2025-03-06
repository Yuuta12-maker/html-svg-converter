/**
 * Application logic for HTML to SVG Converter web interface
 */
(function() {
  'use strict';
  
  // DOM elements
  const htmlInput = document.getElementById('html-input');
  const svgOutput = document.getElementById('svg-output');
  const previewContainer = document.getElementById('preview-container');
  const convertBtn = document.getElementById('convert-btn');
  const copyBtn = document.getElementById('copy-btn');
  const sampleBtn = document.getElementById('sample-btn');
  const downloadBtn = document.getElementById('download-btn');
  const widthInput = document.getElementById('width');
  const heightInput = document.getElementById('height');
  const preserveAspectRatioCheckbox = document.getElementById('preserve-aspect-ratio');
  
  // Sample HTML content for demo
  const sampleHTML = `
<!DOCTYPE html>
<html>
<head>
  <style>
    .container {
      font-family: Arial, sans-serif;
      max-width: 500px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f5f5f5;
      border-radius: 8px;
    }
    
    h1 {
      color: #3498db;
      text-align: center;
    }
    
    .box {
      background-color: white;
      border-radius: 4px;
      padding: 15px;
      margin-bottom: 15px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .title {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 10px;
      color: #2c3e50;
    }
    
    .content {
      color: #555;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>HTML to SVG Example</h1>
    
    <div class="box">
      <div class="title">What is SVG?</div>
      <div class="content">
        SVG (Scalable Vector Graphics) is an XML-based vector image format
        that allows for infinitely scalable graphics and animations.
      </div>
    </div>
    
    <div class="box">
      <div class="title">Why use this converter?</div>
      <div class="content">
        Convert your HTML designs into SVG format for better scaling,
        smaller file sizes, and compatibility with vector editing tools.
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();
  
  // Initialize the application
  function init() {
    // Add event listeners
    convertBtn.addEventListener('click', convertHtmlToSvg);
    copyBtn.addEventListener('click', copySvgToClipboard);
    sampleBtn.addEventListener('click', loadSampleHtml);
    
    // Initial empty state
    updateDownloadButton('');
    
    // Load sample by default for demonstration
    loadSampleHtml();
  }
  
  // Convert HTML to SVG when the button is clicked
  function convertHtmlToSvg() {
    try {
      const html = htmlInput.value;
      if (!html.trim()) {
        showError('Please enter some HTML content');
        return;
      }
      
      // Get options
      const options = {
        width: parseInt(widthInput.value, 10) || 800,
        height: parseInt(heightInput.value, 10) || 600,
        preserveAspectRatio: preserveAspectRatioCheckbox.checked
      };
      
      // Perform conversion
      const svg = window.htmlToSvg(html, options);
      
      // Display results
      svgOutput.value = svg;
      previewContainer.innerHTML = svg;
      updateDownloadButton(svg);
      
      // Scroll to output on mobile
      if (window.innerWidth < 768) {
        document.querySelector('.output-section').scrollIntoView({ behavior: 'smooth' });
      }
      
      showSuccess('Conversion completed successfully!');
    } catch (error) {
      showError('Error converting HTML to SVG: ' + error.message);
      console.error(error);
    }
  }
  
  // Copy SVG content to clipboard
  function copySvgToClipboard() {
    if (!svgOutput.value) {
      showError('No SVG content to copy');
      return;
    }
    
    svgOutput.select();
    document.execCommand('copy');
    
    // Show feedback
    const originalText = copyBtn.textContent;
    copyBtn.textContent = 'Copied!';
    setTimeout(() => {
      copyBtn.textContent = originalText;
    }, 2000);
  }
  
  // Load sample HTML
  function loadSampleHtml() {
    htmlInput.value = sampleHTML;
    convertHtmlToSvg();
  }
  
  // Update download button with SVG content
  function updateDownloadButton(svgContent) {
    if (svgContent) {
      const blob = new Blob([svgContent], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      downloadBtn.href = url;
      downloadBtn.style.display = 'inline-block';
    } else {
      downloadBtn.href = '#';
      downloadBtn.style.display = 'none';
    }
  }
  
  // Show success message
  function showSuccess(message) {
    // For now, we'll just log to console, but you could implement a toast or notification
    console.log('%c' + message, 'color: green');
  }
  
  // Show error message
  function showError(message) {
    // For now, we'll just log to console, but you could implement a toast or notification
    console.error(message);
    alert(message);
  }
  
  // Initialize the application when DOM is loaded
  document.addEventListener('DOMContentLoaded', init);
})();
