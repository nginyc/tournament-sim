import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';

interface Player {
  _id: string;
  name: string;
};

interface Match {
  _id: string;
  player1: Player;
  player2: Player;
  winner: Player;
};

class Ranking {
  rank = -1; // -1 means not ranked yet
  wins = 0;
  losses = 0;
  player: Player;

  constructor(player: Player) {
    this.player = player;
  }
}

@Component({
  selector: 'leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit, OnChanges {

  @Input()
  matches: Match[];

  rankings = [];

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.matches && !changes.matches.firstChange) {
      this.updateRankings();
    }
  }

  // Assumption: if not match winner, is match loser
  _changeWinLossWithWinner(stats: { [key: string]: Ranking }, player: Player, match_winner: Player) {
    if (match_winner._id === player._id) {
      stats[player._id].wins++;
    } else {
      stats[player._id].losses++;
    }
  }

  _getRankingsArray(stats: { [key: string]: Ranking }): Ranking[] {
    const array = [];

    for (const player_id of Object.getOwnPropertyNames(stats)) {
      const stat = stats[player_id];
      array.push(stat);
    }

    return array;
  }

  _sortRanks(rankings: Ranking[]) {
    // For display, sort by wins first, then losses (assuming stable sort)
    rankings.sort((a, b) => {
      return a.losses - b.losses;
    }).sort((a, b) => {
      return b.wins - a.wins;
    });

    // Update rankings' ranks
    for (let i = 0; i < rankings.length; i++) {
      const ranking = rankings[i];
      ranking.rank = i + 1;
    }
  }

  _initializeStats(matches: Match[]): { [key: string]: Ranking } {
    // Populate initial stats with map of player_id -> stat
    const stats: { [key: string]: Ranking } = {};
    for (const match of matches) {
      if (!(match.player1._id in stats)) {
        stats[match.player1._id] = new Ranking(match.player1);
      }

      if (!(match.player2._id in stats)) {
        stats[match.player2._id] = new Ranking(match.player2);
      }
    }

    return stats;
  }

  // Calculate W-L and rank of players based on matches
  updateRankings() {
    let matches = this.matches;

    // Remove matches with null players (due to deletion)
    matches = matches.filter(x => {
      return x.player1 == null || x.player2 == null;
    })

    const stats = this._initializeStats(matches);

    // For each match, update wins/losses
    for (const match of matches) {
      // If match has no winner yet, skip
      if (!match.winner) {
        continue;
      }

      this._changeWinLossWithWinner(stats, match.player1, match.winner);
      this._changeWinLossWithWinner(stats, match.player2, match.winner);
    }

    this.rankings = this._getRankingsArray(stats);
    this._sortRanks(this.rankings);
  }

}
