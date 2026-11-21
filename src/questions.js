/**
 * Curated question bank for Quizly
 */
const questions = [
  {
    id: 1,
    question: "Which of the following is NOT a JavaScript primitive data type?",
    options: ["Boolean", "Undefined", "Object", "Symbol"],
    correctIndex: 2,
    explanation: "Object is a non-primitive (reference) type in JavaScript. Primitives include string, number, bigint, boolean, undefined, symbol, and null."
  },
  {
    id: 2,
    question: "What does `typeof NaN` evaluate to in JavaScript?",
    options: ["'undefined'", "'number'", "'nan'", "'object'"],
    correctIndex: 1,
    explanation: "In JavaScript, NaN (Not-a-Number) is a numeric data type representing an unrepresentable value, so typeof NaN is 'number'."
  },
  {
    id: 3,
    question: "Which operator performs strict equality comparison without type coercion?",
    options: ["==", "!=", "===", "="],
    correctIndex: 2,
    explanation: "=== checks both value and type without converting types implicitly."
  },
  {
    id: 4,
    question: "What is the output of `[1, 2, 3] + [4, 5, 6]` in JavaScript?",
    options: ["[1, 2, 3, 4, 5, 6]", "'1,2,34,5,6'", "NaN", "TypeError"],
    correctIndex: 1,
    explanation: "Arrays are coerced to strings when the + operator is applied: '1,2,3' + '4,5,6' = '1,2,34,5,6'."
  },
  {
    id: 5,
    question: "Which keyword creates a block-scoped variable that cannot be reassigned?",
    options: ["var", "let", "const", "static"],
    correctIndex: 2,
    explanation: "const creates block-scoped identifiers that cannot be reassigned once declared."
  }
];

module.exports = { questions };
