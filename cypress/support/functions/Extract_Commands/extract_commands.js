const fs = require('fs');
const path = require('path');

// Define the file paths
const inputFile = path.join(__dirname, 'Input/commands.ts');  // Adjust the path if necessary
const outputFile = path.join(__dirname, 'Output/extracted_commands.txt');

// Read the content of the `commands.ts` file
fs.readFile(inputFile, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  // Split the content into lines
  const lines = data.split('\n');
  let results = [];

  // Loop through each line to find Cypress declarations and extract the required text
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Check if the line starts with "declare namespace Cypress"
    if (line.startsWith('declare namespace Cypress')) {
      // Move 2 lines down to get the third line
      const thirdLine = lines[i + 2].trim();

      // Extract the first word before the '(' symbol
      const match = thirdLine.match(/^(\w+)\(/);
      if (match && match[1]) {
        // Add the extracted word to the results array
        results.push(match[1]);
      }
    }
  }

  // Write the collected words into the output text file
  fs.writeFile(outputFile, results.join('\n'), 'utf8', (err) => {
    if (err) {
      console.error('Error writing the file:', err);
    } else {
      console.log(`Extracted commands saved to ${outputFile}`);
    }
  });
});
