const assert = require('assert');
const test = require('node:test');
const { generateReportCard } = require('../src/reportCardGenerator');

test('generateReportCard: generates A+ card for high accuracy', () => {
  const card = generateReportCard({
    playerName: 'Lakshya',
    totalQuestions: 10,
    correctAnswers: 10,
    timeTakenSec: 45,
    streakBonus: 250,
  });

  assert.strictEqual(card.grade, 'A+');
  assert.strictEqual(card.accuracyPct, 100);
  assert.strictEqual(card.finalScore, 1250);
  assert.ok(card.formattedCard.includes('JavaScript Grandmaster'));
});

test('generateReportCard: handles failing grade properly', () => {
  const card = generateReportCard({
    playerName: 'Novice',
    totalQuestions: 10,
    correctAnswers: 3,
    timeTakenSec: 90,
  });

  assert.strictEqual(card.grade, 'F');
  assert.strictEqual(card.accuracyPct, 30);
  assert.ok(card.formattedCard.includes('Needs More Practice'));
});
