const fs = require('fs');
const path = require('path');

// Configuration: input file, output file, and author/source/year
const inputFilePath = path.join(__dirname, 'fraze_prevedene.json');   // your original JSON file
const outputFilePath = path.join(__dirname, 'output.json'); // output JSON file
const author = "";
const source = "";
const year = "";

// Read JSON file
fs.readFile(inputFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error("Error reading input file:", err);
    return;
  }

  let json;
  try {
    json = JSON.parse(data);
  } catch (parseErr) {
    console.error("Error parsing JSON:", parseErr);
    return;
  }

  // Enrich each entry
  if (Array.isArray(json.entries)) {
    json.entries = json.entries.map(entry => ({
      ...entry,
      author,
      source,
      year
    }));
  } else {
    console.error("JSON does not contain an 'entries' array.");
    return;
  }

  // Write updated JSON to file
  fs.writeFile(outputFilePath, JSON.stringify(json, null, 2), 'utf8', writeErr => {
    if (writeErr) {
      console.error("Error writing output file:", writeErr);
    } else {
      console.log(`Successfully enriched JSON! Saved to ${outputFilePath}`);
    }
  });
});
