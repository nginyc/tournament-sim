import { TournamentService } from '../tournament.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

class Player {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

@Component({
  selector: 'app-player-add',
  templateUrl: './player-add.component.html',
  styleUrls: ['./player-add.component.css'],
  providers: [TournamentService]
})
export class PlayerAddComponent implements OnInit {

  @Output()
  onAddedEvent = new EventEmitter();

  player: Player;

  constructor(private tournamentService: TournamentService) { }

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.player = new Player(this.tournamentService.getRandomSamplePlayerName());
  }

  onWantAdd($event) {
    this.tournamentService.createPlayer(this.player)
      .then((newPlayer) => {
        this.onAddedEvent.emit({
          player: newPlayer
        });

        this.reload();
      });
  }

}
