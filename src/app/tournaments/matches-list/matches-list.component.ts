import { TournamentService } from '../tournament.service';
import { Router } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

interface Match {
  _id: string;
  winner: any;
  player1: any;
  player2: any;
  isCurrent?: boolean;
  isOver?: boolean;
  isInvalid?: boolean;
}

@Component({
  selector: 'app-matches-list',
  templateUrl: './matches-list.component.html',
  styleUrls: ['./matches-list.component.css'],
  providers: [TournamentService]
})
export class MatchesListComponent implements OnInit {

  @Output()
  matchesChange = new EventEmitter<Match[]>();

  @Input()
  set matches(matches: Match[]) {
    this._matches = Array.from(matches);
    this._initializeMatches(this._matches);
  }

  _matches: Match[];

  constructor(private tournamentService: TournamentService) { }

  ngOnInit() {
  }

  _initializeMatches(matches: Match[]) {
    // Mark invalid matches
    for (const match of matches) {
      if (match.player1 == null || match.player2 == null) {
        match.isInvalid = true; // Any player has been deleted
      }
    }

    // Set the first incomplete match as current
    // At the same time, set isOver and isWinner properties of matches before current
    for (const match of matches) {
      if (match.isInvalid) {
        continue;
      }

      if (match.winner == null) {
        match.isCurrent = true;
        break;
      }

      match.isOver = true;

      if (match.winner) {
        if (match.player1._id == match.winner._id) {
          match.player1.isWinner = true;
        } else if (match.player2._id == match.winner._id) {
          match.player2.isWinner = true;
        }
      }
    }
  }

  _onSelect(match: Match, winner) {
    if (!match.isCurrent) {
      return;
    }

    this.tournamentService.updateMatch(match._id, {
      winner: winner._id
    }).then((updatedMatch) => {
      // Replace updated match in local array
      this._matches = this._matches.map(x => (x._id == updatedMatch._id) ? updatedMatch : x);
      this.matchesChange.emit(this._matches);
    });
  }
}
