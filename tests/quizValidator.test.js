const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const QuizValidator = require('../src/quizValidator');

describe('QuizValidator Unit Tests', () => {
  test('validates a compliant quiz question correctly', () => {
    const validQ = {
      question: 'What is the runtime complexity of binary search?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'],
      answer: 1,
      explanation: 'Binary search halves the search space each step.',
      difficulty: 'medium'
    };
    const res = QuizValidator.validateQuestion(validQ, 0);
    assert.equal(res.isValid, true);
    assert.equal(res.errors.length, 0);
  });

  test('flags invalid question options, answer out of bounds, and duplicate options', () => {
    const invalidQ = {
      question: 'Short',
      options: ['Duplicate', 'Duplicate'],
      answer: 5,
      difficulty: 'extreme'
    };
    const res = QuizValidator.validateQuestion(invalidQ, 1);
    assert.equal(res.isValid, false);
    assert.ok(res.errors.length >= 3);
  });

  test('validates full quiz pack and computes estimated completion duration', () => {
    const pack = [
      {
        question: 'Which protocol is connection-oriented?',
        options: ['UDP', 'TCP', 'IP'],
        answer: 1,
        difficulty: 'easy'
      },
      {
        question: 'What is ACID in database systems?',
        options: ['Atomicity, Consistency, Isolation, Durability', 'Automated Caching In Databases'],
        answer: 0,
        difficulty: 'hard'
      }
    ];

    const res = QuizValidator.validateQuizPack(pack);
    assert.equal(res.isValid, true);
    assert.equal(res.questionCount, 2);
    // 20s (easy) + 60s (hard) = 80s = 1.3 mins
    assert.equal(res.metrics.estimatedCompletionSeconds, 80);
    assert.equal(res.metrics.estimatedMinutes, 1.3);
  });

  test('rejects empty quiz pack', () => {
    const res = QuizValidator.validateQuizPack([]);
    assert.equal(res.isValid, false);
    assert.equal(res.errors[0], 'Quiz pack must be a non-empty array of questions');
  });
});
