/**
 * Quizly Category & Topic Filter
 * Filters question pools by category (e.g. 'JavaScript', 'HTML/CSS', 'Git')
 * and produces randomized subsets for timed rounds.
 */

function filterQuestionsByCategory(questions, category = 'all') {
  if (!Array.isArray(questions)) return [];
  const normCategory = (category || 'all').trim().toLowerCase();

  if (normCategory === 'all') {
    return [...questions];
  }

  return questions.filter(
    (q) => q && typeof q.category === 'string' && q.category.trim().toLowerCase() === normCategory
  );
}

function getRandomQuestionSubset(questions, count = 5) {
  if (!Array.isArray(questions) || questions.length === 0) return [];
  const sampleCount = Math.min(questions.length, Math.max(1, count));

  // Fisher-Yates partial shuffle
  const copy = [...questions];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy.slice(0, sampleCount);
}

module.exports = { filterQuestionsByCategory, getRandomQuestionSubset };
