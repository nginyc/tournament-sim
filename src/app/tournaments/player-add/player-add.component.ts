import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TournamentService } from "../tournament.service";
import { Player } from "../player";

@Component({
  selector: 'player-add',
  templateUrl: './player-add.component.html',
  styleUrls: ['./player-add.component.css'],
  providers: [TournamentService]
})

export class PlayerAddComponent implements OnInit {

  player: Player;

  @Output()
  onAdded = new EventEmitter<Player>();

  constructor(private tournamentService: TournamentService) { }

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.player = new Player();
  }

  onWantAdd() {
    this.tournamentService.createPlayer(this.player)
      .then((player: Player) => {
        this.onAdded.emit(player);
        this.reload();
      });
  }

}
