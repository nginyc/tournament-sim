import { TournamentService } from '../tournament.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.css'],
  providers: [TournamentService]
})
export class PlayersListComponent implements OnInit {

  @Input()
  isSelectMode = false;

  @Input()
  selectedPlayerIds: string[] = [];

  @Output()
  selectedPlayerIdsChange = new EventEmitter<string[]>();

  @Output()
  onDeletedEvent = new EventEmitter();

  @Output()
  onAddedEvent = new EventEmitter();

  _isAdding = false;
  _deleteModalMessage = '';
  _deleteModalTitle = 'Confirm Delete?';
  _isDeleteModalShown = false;
  _playerForDeletion?: any;
  _players: any[];

  constructor(private tournamentService: TournamentService) { }

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.tournamentService
      .getPlayers()
      .then((players: any[]) => {
        this._players = players;
        this._initializePlayers(this._players);
      });
  }

  _initializePlayers(players: any[]) {
    for (const player of players) {
      if (this.selectedPlayerIds.indexOf(player._id) != -1) {
        player.isSelected = true;
      }
    }
  }

  _onSelect(player) {
    // Only for select mode active
    if (!this.isSelectMode) {
      return;
    }

    player.isSelected = !player.isSelected;

    // Update selected players array
    if (player._id in this.selectedPlayerIds) {
      this.selectedPlayerIds.splice(this.selectedPlayerIds.indexOf(player._id), 1); // delete
    } else {
      this.selectedPlayerIds.push(player._id);
    }

    this.selectedPlayerIdsChange.emit(this.selectedPlayerIds);
  }

  _onWantDelete(player) {
    this._playerForDeletion = player;
    this._isDeleteModalShown = true;
    this._deleteModalMessage = `Are you sure you want to delete ${player.name}? This player will be removed from all tournaments!`;
  }

  _onDeleteCancel() {
    this._playerForDeletion = null;
    this._isDeleteModalShown = false;
  }

  _onDeleteConfirm() {
    this.tournamentService.deletePlayer(this._playerForDeletion._id)
      .then((player) => {
        // Remove from players array after deletion from database
        this._players.splice(this._players.indexOf(player._id), 1);

        this.onDeletedEvent.emit({
          player_id: player._id
        });

        this._playerForDeletion = null;
        this._isDeleteModalShown = false;
      });
  }

  _onPlayerAdded({ player }) {
    this._players.push(player);
    this._isAdding = false;
  }

  _onWantViewAdd() {
    this._isAdding = true;
  }

}
