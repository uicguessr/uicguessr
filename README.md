# UICguessr

An interactive HTML5 game designed to help University of Illinois Chicago (UIC) students learn campus building locations through a GeoGuessr-style experience.

## Overview

UICguessr presents players with photos of UIC campus buildings and challenges them to identify the correct location from multiple choices. The game features personalized learning paths, 3D Street View exploration, walking navigation, and an interactive campus map powered by Leaflet.js.

## Features

### 🎮 Core Gameplay
- **Configurable Rounds** - Choose 5, 10, or 15 rounds per session
- **31 Campus Buildings** - Comprehensive coverage of UIC East and West campuses
- **Timer System** - 60-second countdown with color-coded warnings
- **Progressive Hints** - 4 contextual hints per question
- **Bonus Scoring** - Speed bonuses, streak multipliers, and perfect round rewards

### 🎯 Personalized Learning
- **Persona Paths** - Tailored experiences for:
  - 🎓 Freshmen - Focus on lecture halls and student services
  - 🔄 Transfer Students - Department buildings and advising
  - 🚇 Commuters - Buildings near CTA and parking
  - 🩺 Pre-Med - Science buildings and medical campus
  - ⚙️ Engineering - Engineering quad and maker spaces
  - 🎨 Arts & Humanities - Studios, galleries, and humanities buildings
- **Major-Based Decks** - Filter by academic program (Engineering, Sciences, Health Sciences, etc.)

### 🗺️ Interactive Maps
- **Leaflet.js Integration** - Real OpenStreetMap tiles with building markers
- **Building Popups** - Address, category, and nearby landmarks
- **Campus Overview** - Explore all buildings before playing

### 🌐 3D Street View
- **Embedded Street View** - See buildings from ground level
- **Street View Explorer** - Browse all buildings in 3D
- **Google Maps Integration** - Open full Street View experience

### 🚶 Walking Navigation
- **Real Walking Routes** - Powered by OSRM (Open Source Routing Machine)
- **Turn-by-Turn Directions** - Step-by-step walking instructions
- **Time & Distance** - Displayed in miles/feet with realistic walking times
- **GPS Integration** - Use your current location

### 📊 Progress Tracking
- **High Scores** - Local leaderboard with top 10 scores
- **Learning Insights** - Track mastered and weak buildings across sessions
- **Practice Mode** - Focus on buildings you struggle with

### 📚 Campus Resources
- **Comprehensive Guide** - 30+ campus resources across 7 categories
- **Search & Filter** - Find services by category or keyword
- **Direct Links** - Contact info, hours, and official websites

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, or Edge)
- No additional dependencies or installations required

### Installation

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Click "Start Game" to begin

### Running Locally

```bash
# Python 3
python -m http.server 8080

# Node.js
npx http-server -p 8080
```

Then navigate to `http://localhost:8080`

## File Structure

```
├── index.html          # Main HTML structure with all screens
├── styles.css          # Complete styling and animations
├── app.js              # Core game logic and state management
├── data.js             # Building data, questions, personas, and resources
├── sounds.js           # Web Audio API sound system
└── enhanced-map.js     # Leaflet.js campus map with OSRM routing
```

## Scoring System

### Base Points
- First attempt correct: **100 points**
- Second attempt correct: **50 points**
- Incorrect: **0 points**

### Bonus Points
- **Speed Bonus**: +2 points per second remaining (max +30)
- **Streak Bonus**: +10 points × streak multiplier (3+ consecutive correct)
- **Perfect Round Bonus**: +25 points (first try, no hints)

### Maximum Scores
| Rounds | Max Score |
|--------|-----------|
| 5 rounds | 1,025 pts |
| 10 rounds | 2,050 pts |
| 15 rounds | 3,075 pts |

## Buildings Included

### East Campus
| Abbrev | Building |
|--------|----------|
| SCE | Student Center East |
| SRF | Student Recreation Facility |
| LIB | Richard J. Daley Library |
| BSB | Behavioral Sciences Building |
| UH | University Hall |
| SSB | Student Services Building |
| GH | Grant Hall |
| TH | Taft Hall |
| BH | Burnham Hall |
| LCA-LCF | Lecture Centers A through F |
| ARC | Academic & Residential Complex |
| CADA | College of Architecture, Design and the Arts |

### Engineering/Science
| Abbrev | Building |
|--------|----------|
| SES | Science & Engineering South |
| SEO | Science & Engineering Offices |
| SELE | Science & Engineering Laboratories |
| ERF | Engineering Research Facility |
| EIB | Engineering Innovation Building |
| AH | Addams Hall (Maker Space) |

### West/Medical Campus
| Abbrev | Building |
|--------|----------|
| SCW | Student Center West |
| PAV | Credit Union 1 Arena (Pavilion) |
| AHSB | Applied Health Sciences Building |
| SPH | School of Public Health |
| PHARM | College of Pharmacy |
| COMRB | College of Medicine Research Building |
| CSB | Clinical Sciences Building |
| CSN | Clinical Sciences North |

## Technologies

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with gradients, animations, and responsive design
- **Vanilla JavaScript (ES6+)** - No frameworks required
- **Leaflet.js** - Interactive maps with OpenStreetMap
- **OSRM API** - Real walking route calculations
- **Google Street View** - 3D building exploration
- **Web Audio API** - Dynamic sound generation
- **LocalStorage API** - Settings, scores, and learning data persistence

## Browser Compatibility

| Browser | Status |
|---------|--------|
| Chrome/Edge | ✅ Full support |
| Firefox | ✅ Full support |
| Safari | ✅ Full support |
| Mobile browsers | ✅ Responsive design |

## Customization

### Adding New Buildings
Edit `data.js` to add buildings to the `buildings` object:

```javascript
NEW_BUILDING: {
    name: "Building Name (ABBR)",
    abbreviation: "ABBR",
    categories: ["academic"],
    address: "123 Street, Chicago, IL 60607",
    coordinates: { lat: 41.8700, lng: -87.6500 },
    photo: "https://...",
    description: "...",
    resources: [...],
    landmarks: [...],
    features: [...],
    tips: "..."
}
```

### Adding Persona Paths
Edit `personaDefinitions` in `data.js` to add new learning paths.

### Modifying Scoring
Adjust `gameSettings` in `data.js` and bonus calculations in `app.js`.

## API Usage

### OSRM (Walking Routes)
- **Endpoint**: `router.project-osrm.org`
- **Usage**: Free, no API key required
- **Fallback**: Straight-line estimation if unavailable

### Google Street View
- **Embed**: Uses public embed URLs
- **External**: Links to Google Maps Street View

## Contributing

Contributions are welcome! Please feel free to submit pull requests for:
- New building photos
- Additional campus resources
- UI/UX improvements
- Bug fixes

## License

This project is open source and available for educational use.

---

*Built with ❤️ for UIC students*
