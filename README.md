# UICguessr

An interactive HTML5 game designed to help University of Illinois Chicago (UIC) students learn campus building locations through a GeoGuessr-style experience.

## Overview

UICguessr presents players with photos of UIC campus buildings and challenges them to identify the correct location from multiple choices. The game features a complete scoring system with bonuses, progressive hints, timed challenges, and an interactive campus map.

## Features

- **5-Round Gameplay** - Complete game cycle with 8 UIC campus buildings
- **Timer System** - 60-second countdown with color-coded warnings
- **Progressive Hints** - 4 contextual hints per question (architecture, location, abbreviation, features)
- **Bonus Scoring** - Speed bonuses, streak multipliers, and perfect round rewards
- **Sound Effects** - Dynamic audio feedback using Web Audio API
- **Interactive Map** - SVG-based campus map with building highlights and navigation
- **Statistics** - Detailed performance tracking including streaks and bonuses

## Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, or Edge)
- No additional dependencies or installations required

### Installation

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Click "Start Game" to begin

### Running Locally

Simply open `index.html` directly in your browser, or use a local server:

```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server
```

Then navigate to `http://localhost:8000`

## File Structure

```
├── index.html          # Main HTML structure
├── styles.css          # Complete styling and animations
├── app.js              # Core game logic and state management
├── data.js             # Building data and question sets
├── sounds.js           # Web Audio API sound system
└── enhanced-map.js     # Interactive SVG campus map
```

## Scoring System

### Base Points
- First attempt correct: 100 points
- Second attempt correct: 50 points
- Incorrect: 0 points

### Bonus Points
- **Speed Bonus**: +2 points per second when answering with >45s remaining (max +30)
- **Streak Bonus**: +10 points × streak multiplier (starts at 3+ consecutive first-try correct)
- **Perfect Round Bonus**: +25 points (first try correct with no hints used)

### Maximum Scores
- Per round: 205 points
- Full game (5 rounds): 1,025 points

## Game Controls

- **Get Hint** - Reveal progressive hints (up to 4 per question)
- **Submit Answer** - Confirm your selection
- **Continue** - Proceed to the next screen
- **Game Options** - Adjust difficulty and toggle timer/sounds

## Technologies

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with gradients and animations
- **Vanilla JavaScript (ES6+)** - No frameworks or external dependencies
- **Web Audio API** - Dynamic sound generation
- **SVG** - Scalable vector graphics for campus map
- **LocalStorage API** - Settings persistence

## Browser Compatibility

- Chrome/Edge (Chromium) ✓
- Firefox ✓
- Safari ✓

## Building Data

The game includes 8 verified UIC campus buildings:
- Student Center East (SCE)
- Activities & Recreation Center (ARC)
- Behavioral Sciences Building (BSB)
- Richard J. Daley Library (LIB)
- Science & Engineering South (SES)
- University Hall (UH)
- Taft Hall (TH)
- Lecture Center A (LCA)

## Customization

### Adding New Buildings
Edit `data.js` to add buildings to the `buildings` object and include them in `questionSets`.

### Modifying Scoring
Adjust `gameSettings` in `data.js` and bonus calculations in `app.js`.

### Changing Appearance
Edit color variables and styling in `styles.css`.

---

*Built with ❤️ for UIC students*
