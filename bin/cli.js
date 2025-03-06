#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const yargs = require('yargs');
const { htmlToSvg } = require('../index');

// Parse command line arguments
const argv = yargs
  .usage('Usage: $0 <input> <output> [options]')
  .example('$0 input.html output.svg', 'Convert HTML file to SVG')
  .example('$0 input.html output.svg --width 1200 --height 800', 'Convert with custom dimensions')
  .demandCommand(2, 'Input and output file paths are required')
  .option('width', {
    describe: 'Width of the output SVG',
    type: 'number',
    default: 800
  })
  .option('height', {
    describe: 'Height of the output SVG',
    type: 'number',
    default: 600
  })
  .option('preserve-aspect-ratio', {
    describe: 'Whether to preserve aspect ratio',
    type: 'boolean',
    default: true
  })
  .help()
  .alias('help', 'h')
  .version()
  .alias('version', 'v')
  .argv;

// Get input and output file paths
const [inputFile, outputFile] = argv._;

// Check if input file exists
if (!fs.existsSync(inputFile)) {
  console.error(`Error: Input file "${inputFile}" does not exist.`);
  process.exit(1);
}

// Create directory for output file if it doesn't exist
const outputDir = path.dirname(outputFile);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

try {
  // Read HTML file
  const htmlContent = fs.readFileSync(inputFile, 'utf8');
  
  // Convert HTML to SVG
  const svgContent = htmlToSvg(htmlContent, {
    width: argv.width,
    height: argv.height,
    preserveAspectRatio: argv['preserve-aspect-ratio']
  });
  
  // Write SVG to output file
  fs.writeFileSync(outputFile, svgContent, 'utf8');
  
  console.log(`Successfully converted ${inputFile} to ${outputFile}`);
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exit(1);
}
