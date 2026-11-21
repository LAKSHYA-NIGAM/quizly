# Quizly — Interactive JavaScript Quiz CLI 🎯

[![Node.js CI](https://github.com/LAKSHYA-NIGAM/quizly/actions/workflows/ci.yml/badge.svg)](https://github.com/LAKSHYA-NIGAM/quizly/actions/workflows/ci.yml)
[![Node Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)

An interactive, modular command-line quiz application that evaluates core JavaScript, scope, type coercion, and data structure knowledge with colorful terminal feedback, detailed explanations, and live leaderboard rankings.

---

## 🌟 Key Features

- **Interactive Terminal UI:** Built with `readline-sync` for intuitive multi-choice selection with zero terminal flicker.
- **Vibrant ANSI Color Feedback:** Integrated with `kuler` providing instant green/red status cues and highlighted explanations.
- **Modular Engine Architecture:** Decoupled scoring logic, question bank, and leaderboard storage to allow easy unit testing and headless execution.
- **Dynamic Leaderboard System:** Automatically inserts, sorts, and displays top scores with timestamped rankings.
- **Comprehensive Test Coverage:** 100% test pass rate using Node.js native test runner (`node:test`).
- **Continuous Integration:** Automated matrix testing against Node 18, 20, and 22 via GitHub Actions.
- **Custom Quiz Schema Validator (`src/quizValidator.js`):** Enforces JSON question integrity, guarantees non-duplicate answer options, and calculates estimated completion duration across difficulty tiers.
- **Streak Combo Multipliers & Speed Bonuses (`src/streakScoring.js`):** Multiplies points for answer streaks up to 2.0x combo frenzy and computes sub-second speed bonuses.

---

## 🏗️ Architecture & Project Structure

```
quizly/
├── .github/
│   └── workflows/
│       └── ci.yml             # GitHub Actions CI matrix workflow
├── src/
│   ├── questions.js           # Curated question dataset with explanations
│   ├── leaderboard.js         # LeaderboardManager (state & rank calculation)
│   └── quizEngine.js          # Core QuizEngine (evaluation, scoring, metrics)
├── tests/
│   └── quizEngine.test.js     # Native unit tests (node:test + node:assert)
├── .gitignore                 # Clean environment ignoring node_modules
├── index.js                   # Interactive CLI runner
├── package.json               # Package metadata and test scripts
└── README.md                  # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- `npm` (included with Node.js)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/LAKSHYA-NIGAM/quizly.git
   cd quizly
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the quiz:
   ```bash
   npm start
   # or directly
   node index.js
   ```

---

## 🧪 Running Automated Tests

Quizly uses the Node.js built-in test runner requiring zero extra test libraries:

```bash
npm test
```

### Test Suite Highlights
- ✅ Default leaderboard initialization and descending sorting
- ✅ Player entry ranking and score positioning
- ✅ Input validation for empty and non-string player names
- ✅ Single-question evaluation, correct answer verification, and points calculation
- ✅ Error handling on out-of-bound question indices
- ✅ Full quiz session result computation and percentage metrics

---

## 📋 Example CLI Walkthrough

```text
==================================================
             WELCOME TO QUIZLY CLI                
    Test Your Core JavaScript & CS Knowledge      
==================================================

Enter your player name: Alex

Question 1 of 5:
Which of the following is NOT a JavaScript primitive data type?
[1] Boolean
[2] Undefined
[3] Object
[4] Symbol

Choose your answer: 3
✔ Correct!
Explanation: Object is a non-primitive (reference) type in JavaScript.
Current Score: 1/1
```

---

## 📄 License
This project is licensed under the ISC License.
