import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TournamentService } from "../tournament.service";

@Component({
  selector: 'player-add',
  templateUrl: './player-add.component.html',
  styleUrls: ['./player-add.component.css'],
  providers: [TournamentService]
})

export class PlayerAddComponent implements OnInit {

  player = {};

  @Output()
  onAdded = new EventEmitter();

  constructor(private tournamentService: TournamentService) { }

  ngOnInit() {
  }

  reload() {
    this.player = {};
  }

  onWantAdd() {
    this.tournamentService.createPlayer(this.player)
      .then((player) => {
        this.onAdded.emit(player);
        this.reload();
      });
  }

}
