const fs = require('fs');

// Function to reformat text by trimming and ensuring proper paragraph breaks
function reformatText(text) {
  // Split the input text into lines, trim spaces, and join by single newlines
  return text
    .split(/\r?\n/)  // Split by newlines
    .map(line => line.trim())  // Trim each line
    .filter(line => line.length > 0)  // Remove empty lines
    .join('\n\n');  // Add a single newline between paragraphs
}

// Function to read and reformat file content
function reformatFile(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }

    const reformattedText = reformatText(data);

    // Write the reformatted text back to the file (or a new file)
    const outputFilePath = 'reformatted_' + filePath;
    fs.writeFile(outputFilePath, reformattedText, (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return;
      }
      console.log(`File reformatted and saved as ${outputFilePath}`);
    });
  });
}

// Run the script with the file path argument
const filePath = process.argv[2];
if (!filePath) {
  console.error('Please provide a file path as an argument');
  process.exit(1);
}

reformatFile(filePath);
