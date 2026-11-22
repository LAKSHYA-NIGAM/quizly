/**
 * Quizly Terminal Report Card Generator
 * Formats user quiz performance into clean ASCII/text cards with grades, accuracy, and feedback.
 */

function generateReportCard({
  playerName = 'Player',
  totalQuestions = 0,
  correctAnswers = 0,
  timeTakenSec = 0,
  streakBonus = 0,
} = {}) {
  const total = Math.max(1, Number(totalQuestions) || 1);
  const correct = Math.max(0, Math.min(Number(correctAnswers) || 0, total));
  const accuracyPct = Math.round((correct / total) * 100);

  let grade = 'F';
  let title = 'Needs More Practice';

  if (accuracyPct >= 90) {
    grade = 'A+';
    title = 'JavaScript Grandmaster';
  } else if (accuracyPct >= 80) {
    grade = 'A';
    title = 'Proficient Developer';
  } else if (accuracyPct >= 70) {
    grade = 'B';
    title = 'Solid Contributor';
  } else if (accuracyPct >= 50) {
    grade = 'C';
    title = 'Apprentice';
  }

  const finalScore = correct * 100 + Number(streakBonus || 0);

  const lines = [
    '========================================',
    `   QUIZLY REPORT CARD: ${playerName.toUpperCase()}`,
    '========================================',
    ` Performance Rank  : [${grade}] - ${title}`,
    ` Questions Answered: ${total}`,
    ` Correct Answers   : ${correct}`,
    ` Accuracy          : ${accuracyPct}%`,
    ` Total Time        : ${timeTakenSec}s`,
    ` Final Score       : ${finalScore} pts`,
    '========================================',
  ];

  return {
    grade,
    title,
    accuracyPct,
    finalScore,
    formattedCard: lines.join('\n'),
  };
}

module.exports = { generateReportCard };
