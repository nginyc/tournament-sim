import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'matches-list',
  templateUrl: './matches-list.component.html',
  styleUrls: ['./matches-list.component.css']
})

export class MatchesListComponent implements OnInit, OnChanges {

  @Input()
  matches: any[];

  @Output()
  onSelectWinner = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // If matches have changed, re-initialize required properties
    if (changes.matches && !changes.matches.firstChange) {
      this.initializeMatches(changes.matches.currentValue);
    }
  }

  initializeMatches(matches: any[]) {
    // Set the first incomplete match as current
    // At the same time, set isOver and isWinner properties of matches before current
    for (let match of matches) {
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

  onSelect(match, winner) {
    if (!match.isCurrent) return;

    this.onSelectWinner.emit({
      match_id: match._id,
      winner_id: winner._id
    });
  }

}
