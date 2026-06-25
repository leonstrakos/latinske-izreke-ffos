// Reduce latindictionary.json using fraze_prevedene.json lemmas

const fs = require("fs");
const path = require("path");

// ---- FILE PATHS ----
const PHRASES_FILE = path.join(__dirname, "fraze_prevedene.json");
const DICT_FILE = path.join(__dirname, "latindictionary.json");
const OUTPUT_FILE = path.join(__dirname, "latindictionary_reduced.json");

// ---- NORMALIZATION ----
function normalizeWord(word) {
  return word
    .toLowerCase()
    .replace(/[^a-zāēīōūȳ]/g, ""); // keep Latin letters + macrons
}

// ---- STEP 1: LOAD PHRASES ----
const phraseData = JSON.parse(fs.readFileSync(PHRASES_FILE, "utf8"));

if (!phraseData.entries || !Array.isArray(phraseData.entries)) {
  throw new Error("fraze_prevedene.json must contain an 'entries' array");
}

const neededWords = new Set();

// ---- STEP 2: COLLECT WORDS + LEMMAS ----
phraseData.entries.forEach(entry => {
  // 1️⃣ phrase text
  if (entry.phrase) {
    entry.phrase.split(/\s+/).forEach(w => {
      const n = normalizeWord(w);
      if (n) neededWords.add(n);
    });
  }

  // 2️⃣ normalized form
  if (entry.normalized) {
    entry.normalized.split(/\s+/).forEach(w => {
      const n = normalizeWord(w);
      if (n) neededWords.add(n);
    });
  }

  // 3️⃣ lemma field (can be phrase-level or token-level)
  if (Array.isArray(entry.lemma)) {
    entry.lemma.forEach(lem => {
      lem.split(/\s+/).forEach(w => {
        const n = normalizeWord(w);
        if (n) neededWords.add(n);
      });
    });
  }
});

console.log(`✔ Collected ${neededWords.size} unique lemma/word forms`);

// ---- STEP 3: LOAD DICTIONARY ----
const dictionary = JSON.parse(fs.readFileSync(DICT_FILE, "utf8"));

if (!Array.isArray(dictionary)) {
  throw new Error("latindictionary.json must be an array");
}

// ---- STEP 4: FILTER DICTIONARY ----
const reducedDictionary = dictionary.filter(entry => {
  if (!entry.key) return false;
  const keyNorm = normalizeWord(entry.key);
  return neededWords.has(keyNorm);
});

console.log(
  `✔ Reduced dictionary from ${dictionary.length} → ${reducedDictionary.length} entries`
);

// ---- STEP 5: WRITE OUTPUT ----
fs.writeFileSync(
  OUTPUT_FILE,
  JSON.stringify(reducedDictionary, null, 2),
  "utf8"
);

console.log(`✔ Saved: ${OUTPUT_FILE}`);
