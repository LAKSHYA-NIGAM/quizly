/**
 * Quizly Multi-Player Tournament Bracket Generator
 * Generates single-elimination tournament match pairings (Quarterfinals -> Semifinals -> Finals).
 */

function generateTournamentBracket(playerNames = []) {
  if (!Array.isArray(playerNames) || playerNames.length < 2) {
    return { rounds: [], totalPlayers: playerNames?.length || 0, isPowerOfTwo: false };
  }

  // Pad to nearest power of 2 with BYEs if necessary
  const n = playerNames.length;
  const nextPowerOf2 = Math.pow(2, Math.ceil(Math.log2(n)));
  const paddedPlayers = [...playerNames];
  while (paddedPlayers.length < nextPowerOf2) {
    paddedPlayers.push('BYE');
  }

  const firstRoundMatches = [];
  for (let i = 0; i < paddedPlayers.length / 2; i++) {
    firstRoundMatches.push({
      matchId: `R1-M${i + 1}`,
      player1: paddedPlayers[i],
      player2: paddedPlayers[paddedPlayers.length - 1 - i],
      winner: null,
    });
  }

  return {
    totalPlayers: n,
    bracketSize: nextPowerOf2,
    roundsCount: Math.log2(nextPowerOf2),
    firstRoundMatches,
  };
}

module.exports = { generateTournamentBracket };
