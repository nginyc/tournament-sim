import { Component, OnInit } from '@angular/core';
import { TournamentService } from "../tournament.service";

@Component({
  selector: 'players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.css'],
  providers: [TournamentService]
})

export class PlayersListComponent implements OnInit {

  players: any[];
  isAdding: boolean;

  constructor(private tournamentService: TournamentService) { }

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.tournamentService
      .getPlayers()
      .then((players: any[]) => {
        this.players = players;
      });
  }

  onWantAdd($event: Event) {
    this.isAdding = true;
  }

  onAdded($event: Event) {
    this.isAdding = false;
    this.reload();
  }
}
