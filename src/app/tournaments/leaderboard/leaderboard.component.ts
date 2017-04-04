import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';

@Component({
  selector: 'leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})

export class LeaderboardComponent implements OnInit, OnChanges {

  @Input()
  matches: any[];

  rankings = [];

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.matches && !changes.matches.firstChange) {
      this.updateRankings(this.matches);
    }
  }

  _addToStatsIfNot(stats: {}, player) {
    if (!(player._id in stats)) {
      stats[player._id] = {
        wins: 0,
        losses: 0,
        player: player
      };
    }
  }

  // Assumption: if not match winner, is match loser
  _changeWinLossWithWinner(stats: {}, player, match_winner) {
    if (match_winner._id == player._id) {
      stats[player._id].wins++;
    } else {
      stats[player._id].losses++;
    }
  }

  // Calculate W-L and rank of players based on matches
  updateRankings(matches: any[]) {
    const stats = {}; // Will contain player id -> stat object

    for (let match of matches) {
      // If match has no winner yet, skip
      if (!match.winner) {
        continue;
      }

      // If never seen player before, add to ranked players
      this._addToStatsIfNot(stats, match.player1);
      this._addToStatsIfNot(stats, match.player2);

      // Add to wins/losses for players in match
      this._changeWinLossWithWinner(stats, match.player1, match.winner);
      this._changeWinLossWithWinner(stats, match.player2, match.winner);
    }

    // Sort by wins
    const statsArray = [];
    for (let i in stats) {
      const stat = stats[i];
      statsArray.push(stat);
    }
    statsArray.sort((a, b) => {
      return b.wins - a.wins;
    });

    // Update rankings array
    this.rankings = statsArray.map((x, i) => {
      return {
        rank: i + 1,
        wins: x.wins,
        losses: x.losses,
        player: x.player
      }
    });
  }

}
