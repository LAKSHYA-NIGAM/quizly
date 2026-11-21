/**
 * Custom Quiz Pack Schema Validator & Metrics Calibrator
 * Enforces JSON integrity, validates non-ambiguous answer options,
 * and estimates quiz completion duration.
 */

class QuizValidator {
  /**
   * Validates a question object.
   * @param {Object} q - { question, options, answer, explanation, difficulty }
   */
  static validateQuestion(q, index = 0) {
    const errors = [];

    if (!q || typeof q !== 'object') {
      return { isValid: false, errors: [`Question at index ${index} must be an object`] };
    }

    if (!q.question || typeof q.question !== 'string' || q.question.trim().length < 5) {
      errors.push(`Question ${index}: must have a question string of at least 5 characters`);
    }

    if (!Array.isArray(q.options) || q.options.length < 2) {
      errors.push(`Question ${index}: must contain an options array with at least 2 choices`);
    } else {
      const distinct = new Set(q.options.map(opt => String(opt).trim().toLowerCase()));
      if (distinct.size !== q.options.length) {
        errors.push(`Question ${index}: options must not contain duplicate choices`);
      }
    }

    if (typeof q.answer !== 'number' || q.answer < 0 || (Array.isArray(q.options) && q.answer >= q.options.length)) {
      errors.push(`Question ${index}: answer index must be a valid integer between 0 and options.length - 1`);
    }

    const validDifficulties = ['easy', 'medium', 'hard'];
    const difficulty = q.difficulty ? String(q.difficulty).toLowerCase() : 'medium';
    if (!validDifficulties.includes(difficulty)) {
      errors.push(`Question ${index}: difficulty must be one of 'easy', 'medium', or 'hard'`);
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Validates an entire quiz pack array and calculates metadata metrics.
   */
  static validateQuizPack(quizPack) {
    if (!Array.isArray(quizPack) || quizPack.length === 0) {
      return {
        isValid: false,
        questionCount: 0,
        errors: ['Quiz pack must be a non-empty array of questions']
      };
    }

    const allErrors = [];
    const difficultyCount = { easy: 0, medium: 0, hard: 0 };

    quizPack.forEach((q, idx) => {
      const res = QuizValidator.validateQuestion(q, idx);
      if (!res.isValid) {
        allErrors.push(...res.errors);
      }
      const diff = q.difficulty && difficultyCount[q.difficulty.toLowerCase()] !== undefined
        ? q.difficulty.toLowerCase()
        : 'medium';
      difficultyCount[diff]++;
    });

    // Estimate completion time: 20s for easy, 35s for medium, 60s for hard
    const estimatedSeconds =
      difficultyCount.easy * 20 +
      difficultyCount.medium * 35 +
      difficultyCount.hard * 60;

    return {
      isValid: allErrors.length === 0,
      questionCount: quizPack.length,
      errors: allErrors,
      metrics: {
        difficultyBreakdown: difficultyCount,
        estimatedCompletionSeconds: estimatedSeconds,
        estimatedMinutes: Math.round((estimatedSeconds / 60) * 10) / 10
      }
    };
  }
}

module.exports = QuizValidator;
