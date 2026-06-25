LatinFFOS — Latinske Izreke (Latin Phrases)
A lightweight, bilingual Progressive Web App (PWA) designed to store, search, and manage a collection of Latin phrases. The application supports full translations into both Croatian and English, detailed contextual meanings, full-text search, local bookmarking, and infinite scrolling.

🚀 Features
Bilingual Translations & Meanings: View comprehensive entries featuring original Latin phrases along with dual translations and detailed explanations in both Croatian and English.

Dynamic Interactive Filters: Easily toggle visibility on and off for English content, Croatian content, or technical explanations via quick-filter checkboxes to personalize your reading view.

Infinite Scrolling: Features high-performance pagination that dynamically batches and renders entries 100 items at a time as the user scrolls, protecting DOM memory.

Debounced Smart Search: Full-text search across phrases, translations, and inner meanings. Built-in debouncing ensures search filters execute only after typing pauses to minimize CPU overhead.

Local Bookmarks: Save personal favorite phrases instantly using a persistence layer hooked up to localStorage.

Progressive Web App (PWA): Equipped with a service worker registration system and standard application manifests, making it installable across modern mobile and desktop devices for immediate access.

Sleek Responsive UX: Sticky glassmorphism header navigation that adaptively hides during scroll sequences on mobile screens to preserve maximum visual real estate.



🛠️ Architecture & Tech Stack
Frontend: Semantic HTML5, CSS3 Custom Properties (with responsive mobile styling), and vanilla ES6+ JavaScript.

Data Layer: Client-side asynchronous fetching (fetch API) reading data payloads directly from local static JSON models located at /json/fraze_prevedene.json.

Caching & Offline: Native Service Worker initialization logic.

Storage: Key-Value caching via localStorage handling active bookmarks synchronously.


📂 File Directory Overview

├── css/
│   └── style.css            # Custom application layout guidelines & glassmorphic styles
├── img/
│   ├── logo.png             # Core brand graphic
│   ├── gold_bookmark.png    # Active bookmark visual state
│   └── silver_bookmark.png  # Default bookmark visual state
├── json/
│   └── fraze_prevedene.json # Primary database payload containing language mappings
├── manifest/
│   └── icon-192x192.png     # PWA app shortcut configurations
├── bookmarks.html           # Dedicated portal rendering saved entries
├── phrase.html              # Dynamic single-phrase query inspection page
├── index.html               # Primary root layout structure and app orchestration script
└── service-worker.js        # Offline request handling & resource caching script



🔧 Installation & Local Setup
To launch this service locally, simply serve the root directory through your preferred static web environment (such as an Nginx configuration, VS Code Live Server extension, or Node.js running http-server).

Example Using Node.js HTTP Server
Install a global static content router if you don't have one:

npm install -g http-server

cd latinskefraze

http-server .

Access the application in your browser at http://localhost:8080 (or other ports)


⚙️ Data Contract
The internal dataset located at /json/fraze_prevedene.json must align with the following structure for properties to map correctly:


{
  "entries": [
    {
      "phrase": "Ab ovo",
      "common_translation": {
        "hr": "Od jajeta (Od početka)",
        "en": "From the egg (From the absolute beginning)"
      },
      "znacenje": {
        "hr": "Označava detaljno pripovijedanje iliilaženje od samog korijena stvari."
      },
      "meaning": "Refers to starting a story or discussion from its absolute earliest origin."
    }
  ]
}