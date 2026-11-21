/**
 * Leaderboard state & ranking logic for Quizly
 */

class LeaderboardManager {
  constructor(initialData = []) {
    this.entries = initialData.length > 0 ? [...initialData] : [
      { name: "Lakshya", score: 5, date: "2025-07-06" },
      { name: "DevNinja", score: 4, date: "2025-07-05" },
      { name: "CodeExplorer", score: 3, date: "2025-07-04" },
      { name: "ByteRookie", score: 2, date: "2025-07-02" }
    ];
  }

  addEntry(name, score, date = new Date().toISOString().split("T")[0]) {
    if (name === null || name === undefined || typeof name !== "string") {
      throw new Error("Invalid player name");
    }
    const cleanName = name.trim();
    if (cleanName.length === 0) {
      throw new Error("Player name cannot be empty");
    }
    const safeScore = Math.max(0, parseInt(score, 10) || 0);

    const newEntry = { name: cleanName, score: safeScore, date };
    this.entries.push(newEntry);
    this.entries.sort((a, b) => b.score - a.score);
    return this.getRank(cleanName, safeScore);
  }

  getRank(name, score) {
    const index = this.entries.findIndex(e => e.name === name && e.score === score);
    return index !== -1 ? index + 1 : this.entries.length;
  }

  getTopScores(limit = 5) {
    return this.entries.slice(0, limit);
  }
}

module.exports = { LeaderboardManager };
