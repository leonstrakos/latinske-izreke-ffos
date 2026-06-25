
const fs = require("fs");

const inputFile = "./fraze1.json";
const outputFile = "./samofraze2.txt";

const data = JSON.parse(fs.readFileSync(inputFile, "utf8"));

const phrases = data
  .filter(item => item.phrase)
  .map(item => item.phrase)
  .join("\n");

fs.writeFileSync(outputFile, phrases, "utf8");

console.log(`Extracted phrases to ${outputFile}`);

