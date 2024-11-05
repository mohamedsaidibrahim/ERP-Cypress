const fs = require('fs');
const path = require('path');

// Function to convert TypeScript to JavaScript by removing types and interface declarations
function convertTsToJs(tsCode) {
  // Remove TypeScript-specific type annotations (e.g., : string, : number)
  let jsCode = tsCode.replace(/:\s*\w+\s*/g, '');

  // Remove interface definitions like `declare namespace Cypress` and the whole block
  jsCode = jsCode.replace(/declare\s+namespace\s+Cypress\s*{[^}]*?interface\s+Chainable<[^}]*?{[^}]*?}\s*}/gs, '');

  // Return the converted code
  return jsCode;
}

// Read the TypeScript file and convert it
function convertFile(tsFilePath) {
  const tsFileName = path.basename(tsFilePath);
  const jsFileName = tsFileName.replace('.ts', '.js');

  // Read the TypeScript file
  fs.readFile(tsFilePath, 'utf-8', (err, tsCode) => {
    if (err) {
      console.error('Error reading the TypeScript file:', err);
      return;
    }

    // Convert TypeScript code to JavaScript code
    const jsCode = convertTsToJs(tsCode);

    // Write the JavaScript file
    fs.writeFile(jsFileName, jsCode, (err) => {
      if (err) {
        console.error('Error writing the JavaScript file:', err);
        return;
      }
      console.log(`Successfully converted ${tsFileName} to ${jsFileName}`);
    });
  });
}

// Example usage: specify the TypeScript file to convert
const tsFilePath = 'D:/projects/0.Microtc/microtec1-erp_cypress_automation-9bbfd85d0c31/cypress/support/commands.ts';
convertFile(tsFilePath);
