/**
 * Streak Combo Multiplier and Speed Bonus Scoring Engine
 * Computes progressive score multipliers for answer streaks,
 * sub-second speed bonuses, and percentile calculations.
 */

class StreakScoringEngine {
  constructor(options = {}) {
    this.basePoints = options.basePoints || 100;
    this.timeLimitSeconds = options.timeLimitSeconds || 30;
    this.currentStreak = 0;
    this.maxStreak = 0;
    this.totalScore = 0;
  }

  /**
   * Returns current streak multiplier.
   */
  getMultiplier() {
    if (this.currentStreak >= 7) return 2.0;
    if (this.currentStreak >= 5) return 1.5;
    if (this.currentStreak >= 3) return 1.25;
    return 1.0;
  }

  /**
   * Evaluates an answer submission and computes points awarded.
   * @param {boolean} isCorrect - whether answer was correct
   * @param {number} responseTimeSeconds - seconds taken to submit answer
   */
  submitAnswer(isCorrect, responseTimeSeconds = 15) {
    if (!isCorrect) {
      this.currentStreak = 0;
      return {
        isCorrect: false,
        pointsAwarded: 0,
        currentStreak: 0,
        multiplier: 1.0,
        totalScore: this.totalScore
      };
    }

    this.currentStreak += 1;
    if (this.currentStreak > this.maxStreak) {
      this.maxStreak = this.currentStreak;
    }

    const multiplier = this.getMultiplier();
    const streakPoints = Math.round(this.basePoints * multiplier);

    // Speed bonus: up to 50 additional points if answered under half the time limit
    const elapsed = Math.max(1, Math.min(this.timeLimitSeconds, responseTimeSeconds));
    let speedBonus = 0;
    if (elapsed < this.timeLimitSeconds / 2) {
      const remainingRatio = (this.timeLimitSeconds / 2 - elapsed) / (this.timeLimitSeconds / 2);
      speedBonus = Math.round(50 * remainingRatio);
    }

    const pointsAwarded = streakPoints + speedBonus;
    this.totalScore += pointsAwarded;

    return {
      isCorrect: true,
      pointsAwarded,
      basePoints: this.basePoints,
      multiplier,
      speedBonus,
      currentStreak: this.currentStreak,
      maxStreak: this.maxStreak,
      totalScore: this.totalScore
    };
  }

  /**
   * Calculates percentile rank of score among historical scores.
   * @param {number} userScore
   * @param {Array<number>} historicalScores
   */
  static calculatePercentile(userScore, historicalScores = []) {
    if (!Array.isArray(historicalScores) || historicalScores.length === 0) {
      return 100.0;
    }
    const strictlyLower = historicalScores.filter(s => s < userScore).length;
    const equalCount = historicalScores.filter(s => s === userScore).length;
    const percentile = ((strictlyLower + 0.5 * equalCount) / historicalScores.length) * 100;
    return Math.round(percentile * 10) / 10;
  }

  reset() {
    this.currentStreak = 0;
    this.maxStreak = 0;
    this.totalScore = 0;
  }
}

module.exports = StreakScoringEngine;
