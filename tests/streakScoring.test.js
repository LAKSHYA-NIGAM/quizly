const { test, describe, beforeEach } = require('node:test');
const assert = require('node:assert/strict');
const StreakScoringEngine = require('../src/streakScoring');

describe('StreakScoringEngine Unit Tests', () => {
  let engine;

  beforeEach(() => {
    engine = new StreakScoringEngine({ basePoints: 100, timeLimitSeconds: 20 });
  });

  test('awards base points on initial correct answers', () => {
    const res = engine.submitAnswer(true, 15); // > 10s -> no speed bonus
    assert.equal(res.isCorrect, true);
    assert.equal(res.currentStreak, 1);
    assert.equal(res.multiplier, 1.0);
    assert.equal(res.pointsAwarded, 100);
    assert.equal(res.totalScore, 100);
  });

  test('applies speed bonus when answered quickly under half time limit', () => {
    // 2s out of 20s limit (half is 10s). 8s remaining / 10s = 80% of 50 bonus = 40 pts
    const res = engine.submitAnswer(true, 2);
    assert.equal(res.isCorrect, true);
    assert.equal(res.speedBonus, 40);
    assert.equal(res.pointsAwarded, 140);
  });

  test('scales multiplier on consecutive streaks and resets on incorrect answer', () => {
    // 3 consecutive answers
    engine.submitAnswer(true, 15);
    engine.submitAnswer(true, 15);
    const r3 = engine.submitAnswer(true, 15);
    assert.equal(r3.currentStreak, 3);
    assert.equal(r3.multiplier, 1.25);
    assert.equal(r3.pointsAwarded, 125);

    // Incorrect answer breaks streak
    const r4 = engine.submitAnswer(false, 15);
    assert.equal(r4.currentStreak, 0);
    assert.equal(r4.multiplier, 1.0);
    assert.equal(r4.pointsAwarded, 0);
  });

  test('reaches 2.0x combo frenzy multiplier on 7+ streak', () => {
    for (let i = 0; i < 6; i++) {
      engine.submitAnswer(true, 15);
    }
    const r7 = engine.submitAnswer(true, 15);
    assert.equal(r7.currentStreak, 7);
    assert.equal(r7.multiplier, 2.0);
    assert.equal(r7.pointsAwarded, 200);
  });

  test('calculates accurate percentile rankings', () => {
    const historical = [100, 200, 300, 400, 500];
    const pTop = StreakScoringEngine.calculatePercentile(600, historical);
    assert.equal(pTop, 100.0);

    const pMid = StreakScoringEngine.calculatePercentile(300, historical);
    assert.equal(pMid, 50.0);
  });
});
