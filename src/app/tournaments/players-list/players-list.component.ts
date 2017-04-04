import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TournamentService } from "../tournament.service";

@Component({
  selector: 'players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.css'],
  providers: [TournamentService]
})

export class PlayersListComponent implements OnInit {

  players = [];

  isAdding = false;

  @Input()
  selectedPlayers = [];

  @Input()
  isSelectMode = false;

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

  onSelect(player) {
    // Only for select mode active
    if (!this.isSelectMode) {
      return;
    }

    player.isSelected = !player.isSelected;

    // Update selected players array
    if (player.isSelected) {
      this.selectedPlayers.push(player._id);
    } else {
      this.selectedPlayers.splice(this.selectedPlayers.indexOf(player._id), 1);
    }
  }

  onDelete(player) {
    // Remove from selected players array
    this.selectedPlayers.splice(this.selectedPlayers.indexOf(player._id), 1);

    this.tournamentService.deletePlayer(player._id)
      .then((player) => {
        // Remove from players array after deletion from database
        this.players.splice(this.players.indexOf(player._id), 1);
      });
  }

  onWantAdd() {
    this.isAdding = true;
  }

  onAdded(player) {
    this.isAdding = false;
    this.players.push(player);
  }
}
