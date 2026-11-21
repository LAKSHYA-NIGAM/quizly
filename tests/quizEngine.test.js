const test = require("node:test");
const assert = require("node:assert/strict");
const { QuizEngine } = require("../src/quizEngine");
const { LeaderboardManager } = require("../src/leaderboard");
const { questions } = require("../src/questions");

test("LeaderboardManager: initializes with default sample entries sorted descending", () => {
  const lm = new LeaderboardManager();
  const top = lm.getTopScores();
  assert.ok(top.length > 0, "Should contain default entries");
  for (let i = 0; i < top.length - 1; i++) {
    assert.ok(top[i].score >= top[i + 1].score, "Leaderboard must be sorted descending");
  }
});

test("LeaderboardManager: properly inserts new entry and returns correct rank", () => {
  const lm = new LeaderboardManager([
    { name: "Alice", score: 10, date: "2025-01-01" },
    { name: "Bob", score: 5, date: "2025-01-01" }
  ]);

  const rank = lm.addEntry("Charlie", 8, "2025-01-02");
  assert.equal(rank, 2, "Score of 8 should rank #2 between 10 and 5");

  const top = lm.getTopScores(3);
  assert.equal(top[1].name, "Charlie");
  assert.equal(top[1].score, 8);
});

test("LeaderboardManager: validates empty or non-string names", () => {
  const lm = new LeaderboardManager();
  assert.throws(() => lm.addEntry("", 5), /Player name cannot be empty/);
  assert.throws(() => lm.addEntry(null, 5), /Invalid player name/);
  assert.throws(() => lm.addEntry(123, 5), /Invalid player name/);
});

test("QuizEngine: returns question count and properly formatted question data", () => {
  const engine = new QuizEngine();
  assert.equal(engine.getQuestionCount(), questions.length);

  const q0 = engine.getQuestion(0);
  assert.ok(q0);
  assert.equal(q0.index, 0);
  assert.equal(q0.total, questions.length);
  assert.ok(Array.isArray(q0.options));
  assert.equal(engine.getQuestion(-1), null);
  assert.equal(engine.getQuestion(999), null);
});

test("QuizEngine: evaluates correct and incorrect answers with proper explanations", () => {
  const engine = new QuizEngine();
  const correctEval = engine.evaluateAnswer(0, 2);
  assert.equal(correctEval.isCorrect, true);
  assert.equal(correctEval.pointsEarned, 1);

  const incorrectEval = engine.evaluateAnswer(0, 0);
  assert.equal(incorrectEval.isCorrect, false);
  assert.equal(incorrectEval.correctIndex, 2);
  assert.ok(incorrectEval.explanation.length > 0);
});

test("QuizEngine: throws error on invalid question index", () => {
  const engine = new QuizEngine();
  assert.throws(() => engine.evaluateAnswer(-1, 0), /Invalid question index/);
  assert.throws(() => engine.evaluateAnswer(100, 0), /Invalid question index/);
});

test("QuizEngine: computes final results, percentage, and leaderboard rank accurately", () => {
  const engine = new QuizEngine();
  // 5 questions: answer 0: correct(2), 1: correct(1), 2: correct(2), 3: incorrect(0), 4: correct(2)
  const answers = [2, 1, 2, 0, 2];
  const result = engine.computeFinalResult("TestPlayer", answers);

  assert.equal(result.playerName, "TestPlayer");
  assert.equal(result.finalScore, 4);
  assert.equal(result.maxPossibleScore, 5);
  assert.equal(result.percentage, 80);
  assert.ok(result.rank >= 1);
  assert.equal(result.details.length, 5);
});
