const fs = require("fs");

// FILES
const jsonFile = "./fraze.json";
const linesFile = "./prijevod.txt";
const outputFile = "./fraze_prevedene.json";

// LOAD DATA
const data = JSON.parse(fs.readFileSync(jsonFile, "utf8"));
const lines = fs.readFileSync(linesFile, "utf8")
  .split("\n")
  .map(l => l.trim())
  .filter(Boolean);

// CREATE LOOKUP MAP
const entryMap = new Map();
data.entries.forEach(entry => {
  if (entry.normalized) {
    entryMap.set(entry.normalized.toLowerCase(), entry);
  }
});

// PARSE LINES
for (const line of lines) {
  const parts = line.split(" /n ").map(p => p.trim());

  if (parts.length !== 3) {
    console.warn("Skipped malformed line:", line);
    continue;
  }

  const [phrase, hrTranslation, hrMeaning] = parts;
  const key = phrase.toLowerCase();

  const entry = entryMap.get(key);
  if (!entry) {
    console.warn("No match found for:", phrase);
    continue;
  }

  // ADD HR TRANSLATION
  if (!entry.common_translation) {
    entry.common_translation = {};
  }

  if (!entry.common_translation.hr) {
    entry.common_translation.hr = hrTranslation;
  }

  // ADD HR MEANING
  if (!entry.znacenje) {
    entry.znacenje = {};
  }

  if (!entry.znacenje.hr) {
    entry.znacenje.hr = hrMeaning;
  }
}

// UPDATE META
data.meta.updated_at = new Date().toISOString();

// SAVE
fs.writeFileSync(outputFile, JSON.stringify(data, null, 2), "utf8");

console.log(`✅ JSON updated and saved to ${outputFile}`);
