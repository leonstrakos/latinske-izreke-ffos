const fs = require("fs");

// FILES
const phrasesFile = "./samofraze.txt";        
const jsonFile = "./fraze_prevedene.json";            // your JSON with entries
const outputFile = "./missing_phrases.txt"; // phrases NOT found in JSON

// READ PHRASES TXT
const phrasesText = fs.readFileSync(phrasesFile, "utf8");

const phrases = phrasesText
  .split("\n")
  .map(p => p.trim())
  .filter(Boolean);

// READ JSON
const data = JSON.parse(fs.readFileSync(jsonFile, "utf8"));

// BUILD SET OF JSON PHRASES
const jsonPhrases = new Set(
  data.entries
    .filter(e => e.phrase)
    .map(e => e.phrase.trim().toLowerCase())
);

// COMPARE
const missing = phrases.filter(p =>
  !jsonPhrases.has(p.toLowerCase())
);

// SAVE RESULT
fs.writeFileSync(outputFile, missing.join("\n"), "utf8");

console.log(`Checked ${phrases.length} phrases`);
console.log(`Missing: ${missing.length}`);
console.log(`Saved to ${outputFile}`);
