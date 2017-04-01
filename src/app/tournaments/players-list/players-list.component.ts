import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

  @Input()
  selectedPlayers = [];

  @Input()
  isSelectMode: boolean = false;

  constructor(private tournamentService: TournamentService) { }

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.tournamentService
      .getPlayers()
      .then((players: any[]) => {
        this.players = players;

        // Select players initialized as selected
        this.players.filter(x => x._id in this.selectedPlayers)
          .forEach(x => x.isSelected = true);
      });
  }

  onSelect($event: Event, player) {
    player.isSelected = !player.isSelected;

    // Update selected players array
    if (player.isSelected) {
      this.selectedPlayers.push(player._id);
    } else {
      this.selectedPlayers.splice(this.selectedPlayers.indexOf(player._id), 1);
    }
  }

  onWantAdd($event: Event) {
    this.isAdding = true;
  }

  onAdded($event: Event, player) {
    this.isAdding = false;
    this.players.push(player);
  }
}
