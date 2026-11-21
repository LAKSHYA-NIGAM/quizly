const assert = require('assert');
const test = require('node:test');
const { filterQuestionsByCategory, getRandomQuestionSubset } = require('../src/categoryFilter');

const mockQuestions = [
  { id: '1', category: 'JavaScript', text: 'JS Question 1' },
  { id: '2', category: 'JavaScript', text: 'JS Question 2' },
  { id: '3', category: 'Git', text: 'Git Question 1' },
  { id: '4', category: 'CSS', text: 'CSS Question 1' },
];

test('filterQuestionsByCategory: filters questions by category name', () => {
  const jsQuestions = filterQuestionsByCategory(mockQuestions, 'javascript');
  assert.strictEqual(jsQuestions.length, 2);
  assert.strictEqual(jsQuestions[0].category, 'JavaScript');

  const allQuestions = filterQuestionsByCategory(mockQuestions, 'all');
  assert.strictEqual(allQuestions.length, 4);
});

test('getRandomQuestionSubset: returns requested subset size without exceeding total', () => {
  const subset = getRandomQuestionSubset(mockQuestions, 2);
  assert.strictEqual(subset.length, 2);

  const overflow = getRandomQuestionSubset(mockQuestions, 10);
  assert.strictEqual(overflow.length, 4);
});
