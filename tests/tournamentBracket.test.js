const assert = require('assert');
const test = require('node:test');
const { generateTournamentBracket } = require('../src/tournamentBracket');

test('generateTournamentBracket: creates clean 4-player bracket', () => {
  const players = ['Alice', 'Bob', 'Charlie', 'David'];
  const bracket = generateTournamentBracket(players);

  assert.strictEqual(bracket.bracketSize, 4);
  assert.strictEqual(bracket.roundsCount, 2);
  assert.strictEqual(bracket.firstRoundMatches.length, 2);
  assert.strictEqual(bracket.firstRoundMatches[0].player1, 'Alice');
  assert.strictEqual(bracket.firstRoundMatches[0].player2, 'David');
});

test('generateTournamentBracket: pads odd player counts with BYE', () => {
  const players = ['Player 1', 'Player 2', 'Player 3'];
  const bracket = generateTournamentBracket(players);

  assert.strictEqual(bracket.bracketSize, 4);
  assert.strictEqual(bracket.firstRoundMatches[0].player2, 'BYE');
});
