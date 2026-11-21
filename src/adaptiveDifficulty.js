/**
 * Quizly Adaptive Difficulty Selector
 * Adjusts question difficulty (easy -> medium -> hard) based on consecutive correct streaks,
 * or drops back to easier questions after consecutive misses.
 */

function determineNextDifficulty(currentDifficulty = 'easy', consecutiveCorrect = 0, consecutiveWrong = 0) {
  const norm = (currentDifficulty || 'easy').toLowerCase();

  // Promote difficulty on 2+ consecutive correct answers
  if (consecutiveCorrect >= 2) {
    if (norm === 'easy') return 'medium';
    if (norm === 'medium') return 'hard';
    return 'hard';
  }

  // Demote difficulty on 2+ consecutive wrong answers
  if (consecutiveWrong >= 2) {
    if (norm === 'hard') return 'medium';
    if (norm === 'medium') return 'easy';
    return 'easy';
  }

  return norm;
}

function selectAdaptiveQuestion(questionPool, targetDifficulty, answeredIds = new Set()) {
  if (!Array.isArray(questionPool) || questionPool.length === 0) return null;

  const available = questionPool.filter(
    (q) => !answeredIds.has(q.id) && (q.difficulty || 'easy').toLowerCase() === targetDifficulty.toLowerCase()
  );

  if (available.length > 0) {
    return available[Math.floor(Math.random() * available.length)];
  }

  // Fallback: any unanswered question
  const fallback = questionPool.filter((q) => !answeredIds.has(q.id));
  return fallback.length > 0 ? fallback[0] : null;
}

module.exports = { determineNextDifficulty, selectAdaptiveQuestion };
