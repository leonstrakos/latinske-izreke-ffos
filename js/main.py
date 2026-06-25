from cltk import NLP
import json

# Initialize Latin NLP pipeline
nlp = NLP("lat")

# Load your original JSON
with open("fraze_prevedene.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# Analyze each phrase
for entry in data["entries"]:
    phrase = entry.get("phrase", "")
    if not phrase:
        continue

    doc = nlp.analyze(phrase)

    words = []
    for word in doc.words:
            words.append({
                "form": word.string,
                "lemma": word.lemma,
                "upos": str(word.upos) if hasattr(word, "upos") and word.upos else None,
                "xpos": str(word.xpos) if hasattr(word, "xpos") and word.xpos else None,
                "features": word.features if isinstance(getattr(word, "features", None), dict) else None
            })

    entry["analysis"] = words

# Save enriched JSON
with open("fraze_prevedene_enriched.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("✅ Done! Enriched JSON saved as fraze_prevedene_enriched.json")
