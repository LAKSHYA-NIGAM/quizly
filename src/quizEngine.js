/**
 * Quiz Engine: Pure business logic for quiz evaluation and session progression
 */

const { questions: defaultQuestions } = require("./questions");
const { LeaderboardManager } = require("./leaderboard");

class QuizEngine {
  constructor(options = {}) {
    this.questions = options.questions || defaultQuestions;
    this.leaderboard = options.leaderboard || new LeaderboardManager();
    this.scorePerCorrect = options.scorePerCorrect || 1;
    this.penaltyPerIncorrect = options.penaltyPerIncorrect || 0;
  }

  getQuestionCount() {
    return this.questions.length;
  }

  getQuestion(index) {
    if (index < 0 || index >= this.questions.length) {
      return null;
    }
    const q = this.questions[index];
    return {
      id: q.id,
      index,
      total: this.questions.length,
      question: q.question,
      options: [...q.options]
    };
  }

  evaluateAnswer(questionIndex, chosenIndex) {
    if (questionIndex < 0 || questionIndex >= this.questions.length) {
      throw new Error(`Invalid question index: ${questionIndex}`);
    }
    const q = this.questions[questionIndex];
    const isCorrect = chosenIndex === q.correctIndex;

    return {
      isCorrect,
      correctIndex: q.correctIndex,
      correctAnswer: q.options[q.correctIndex],
      explanation: q.explanation,
      pointsEarned: isCorrect ? this.scorePerCorrect : -this.penaltyPerIncorrect
    };
  }

  computeFinalResult(playerName, answers) {
    let score = 0;
    const details = [];

    for (let i = 0; i < this.questions.length; i++) {
      const chosen = answers[i];
      const evalResult = this.evaluateAnswer(i, chosen);
      if (evalResult.isCorrect) {
        score += evalResult.pointsEarned;
      }
      details.push({
        questionId: this.questions[i].id,
        question: this.questions[i].question,
        chosenIndex: chosen,
        ...evalResult
      });
    }

    const rank = this.leaderboard.addEntry(playerName, score);

    return {
      playerName,
      finalScore: score,
      maxPossibleScore: this.questions.length * this.scorePerCorrect,
      percentage: Math.round((score / (this.questions.length * this.scorePerCorrect)) * 100),
      rank,
      details,
      topLeaderboard: this.leaderboard.getTopScores()
    };
  }
}

module.exports = { QuizEngine };
