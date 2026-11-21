const assert = require('assert');
const test = require('node:test');
const { determineNextDifficulty, selectAdaptiveQuestion } = require('../src/adaptiveDifficulty');

test('determineNextDifficulty: promotes from easy to medium to hard on streaks', () => {
  assert.strictEqual(determineNextDifficulty('easy', 2, 0), 'medium');
  assert.strictEqual(determineNextDifficulty('medium', 2, 0), 'hard');
  assert.strictEqual(determineNextDifficulty('hard', 2, 0), 'hard');
});

test('determineNextDifficulty: demotes difficulty on consecutive wrong answers', () => {
  assert.strictEqual(determineNextDifficulty('hard', 0, 2), 'medium');
  assert.strictEqual(determineNextDifficulty('medium', 0, 2), 'easy');
  assert.strictEqual(determineNextDifficulty('easy', 0, 2), 'easy');
});

test('selectAdaptiveQuestion: filters by target difficulty and excludes answered questions', () => {
  const pool = [
    { id: 'q1', difficulty: 'easy', text: 'Easy Q' },
    { id: 'q2', difficulty: 'hard', text: 'Hard Q' },
  ];
  const selected = selectAdaptiveQuestion(pool, 'hard', new Set());
  assert.strictEqual(selected.id, 'q2');

  const answered = new Set(['q2']);
  const fallback = selectAdaptiveQuestion(pool, 'hard', answered);
  assert.strictEqual(fallback.id, 'q1'); // Fell back to remaining question
});
