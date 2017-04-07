import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tournament-add',
  templateUrl: './tournament-add.component.html',
  styleUrls: ['./tournament-add.component.css']
})

export class TournamentAddComponent implements OnInit {

  static readonly TYPES = ['ROUND_ROBIN'];

  @Output()
  onWantAddTournamentEvent = new EventEmitter();

  @Output()
  onWantDeletePlayerEvent = new EventEmitter();

  @Output()
  onWantAddPlayerEvent = new EventEmitter();

  @Input()
  players: any[];

  tournament = {};

  constructor() { }

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.tournament = {
      players: [],
      type: TournamentAddComponent.TYPES[0]
    };
  }

  onWantAdd() {
    this.onWantAddTournamentEvent.emit({
      tournament: this.tournament
    });
  }

  onWantAddPlayer({ player }) {
    this.onWantAddPlayerEvent.emit({
      player: player
    });
  }

  onWantDeletePlayer({ player_id }) {
    this.onWantDeletePlayerEvent.emit({
      player_id: player_id
    });
  }
}
