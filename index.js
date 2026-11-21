#!/usr/bin/env node

/**
 * Quizly - Interactive JavaScript Quiz CLI
 * Author: Lakshya Nigam
 */

let readlineSync;
let kuler;

try {
  readlineSync = require("readline-sync");
} catch (e) {
  console.error("Missing dependency 'readline-sync'. Run `npm install` first.");
  process.exit(1);
}

try {
  kuler = require("kuler");
} catch (e) {
  // Graceful fallback if kuler isn't available
  kuler = (str, color) => str;
}

const { QuizEngine } = require("./src/quizEngine");

function formatColor(text, hexColor) {
  try {
    return kuler(text, hexColor);
  } catch (err) {
    return text;
  }
}

function runCLI() {
  console.clear();
  console.log(formatColor("==================================================", "#6C5CE7"));
  console.log(formatColor("             WELCOME TO QUIZLY CLI                ", "#00CEC9"));
  console.log(formatColor("    Test Your Core JavaScript & CS Knowledge      ", "#FDCB6E"));
  console.log(formatColor("==================================================\n", "#6C5CE7"));

  const playerName = readlineSync.question("Enter your player name: ", {
    defaultInput: "Player"
  }).trim() || "Player";

  console.log(`\nHello, ${formatColor(playerName, "#0984E3")}! Let's begin the quiz.\n`);

  const engine = new QuizEngine();
  const totalQuestions = engine.getQuestionCount();
  const answers = [];
  let currentScore = 0;

  for (let i = 0; i < totalQuestions; i++) {
    const q = engine.getQuestion(i);
    console.log(formatColor(`\nQuestion ${i + 1} of ${totalQuestions}:`, "#A29BFE"));
    console.log(formatColor(q.question, "#DFE6E9"));

    const chosenIndex = readlineSync.keyInSelect(q.options, "Choose your answer:", {
      cancel: false
    });

    answers.push(chosenIndex);

    const evaluation = engine.evaluateAnswer(i, chosenIndex);
    if (evaluation.isCorrect) {
      currentScore += evaluation.pointsEarned;
      console.log(formatColor("✔ Correct!", "#00B894"));
    } else {
      console.log(formatColor(`✘ Incorrect! The correct answer was: "${evaluation.correctAnswer}"`, "#D63031"));
    }
    console.log(formatColor(`Explanation: ${evaluation.explanation}`, "#B2BEC3"));
    console.log(formatColor(`Current Score: ${currentScore}/${i + 1}\n`, "#FFEAA7"));
  }

  // Summary and Leaderboard
  const result = engine.computeFinalResult(playerName, answers);

  console.log(formatColor("\n==================================================", "#6C5CE7"));
  console.log(formatColor("                   QUIZ RESULTS                   ", "#00CEC9"));
  console.log(formatColor("==================================================", "#6C5CE7"));
  console.log(`Player:       ${formatColor(result.playerName, "#74B9FF")}`);
  console.log(`Final Score:  ${formatColor(`${result.finalScore} / ${result.maxPossibleScore}`, "#55EFC4")} (${result.percentage}%)`);
  console.log(`Leaderboard:  Rank #${formatColor(String(result.rank), "#FDCB6E")}\n`);

  console.log(formatColor("🏆 LIVE TOP LEADERBOARD:", "#FDCB6E"));
  console.log("-----------------------------------------");
  console.log("Rank | Name            | Score | Date");
  console.log("-----------------------------------------");
  result.topLeaderboard.forEach((entry, idx) => {
    const rankStr = `#${idx + 1}`.padEnd(4);
    const nameStr = entry.name.padEnd(15);
    const scoreStr = `${entry.score}`.padEnd(5);
    console.log(`${rankStr} | ${nameStr} | ${scoreStr} | ${entry.date}`);
  });
  console.log("-----------------------------------------");

  console.log(formatColor("\nThank you for playing Quizly! Keep learning JavaScript.\n", "#00CEC9"));
}

if (require.main === module) {
  runCLI();
}

module.exports = { runCLI };
