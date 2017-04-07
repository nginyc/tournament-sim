import { isBlockScopedBindingElement } from 'tslint/lib';
import { ConfirmationModalComponent } from '../../templates/confirmation-modal/confirmation-modal.component';
import { TournamentService } from '../tournament.service';
import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';

interface Player {
  _id: string;
  isSelected?: boolean;
  name: string;
}

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

  _playerForDeletion?: Player;
  _players: Player[];
  _isAdding = false;

  @ViewChild(ConfirmationModalComponent)
  _deleteConfirmationModal: ConfirmationModalComponent;

  constructor(private tournamentService: TournamentService) { }

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.tournamentService
      .getPlayers()
      .then((players: Player[]) => {
        this._players = players;
        this._initializePlayers(this._players);
      });
  }

  _initializePlayers(players: Player[]) {
    for (const player of players) {
      if (this.selectedPlayerIds.indexOf(player._id) != -1) {
        player.isSelected = true;
      }
    }
  }

  _onSelect(player: Player) {
    // Only for select mode active
    if (!this.isSelectMode) {
      return;
    }

    player.isSelected = !player.isSelected;

    // Update selected players array
    if (this.selectedPlayerIds.indexOf(player._id) != -1) {
      this.selectedPlayerIds.splice(this.selectedPlayerIds.indexOf(player._id), 1); // delete
    } else {
      this.selectedPlayerIds.push(player._id);
    }

    this.selectedPlayerIdsChange.emit(this.selectedPlayerIds);
  }

  _onWantDelete(player: Player) {
    this._playerForDeletion = player;
    this._deleteConfirmationModal.show('Confirm Delete?',
      `Are you sure you want to delete ${player.name}? This player will be removed from all tournaments!`);
  }

  _onDeleteCancel() {
    this._playerForDeletion = null;
    this._deleteConfirmationModal.hide();
  }

  _onDeleteConfirm() {
    this.tournamentService.deletePlayer(this._playerForDeletion._id)
      .then((player) => {
        // Remove from players array after deletion from database
        this._players = this._players.filter(x => x._id != player._id);

        this.onDeletedEvent.emit({
          player_id: player._id
        });

        this._playerForDeletion = null;
        this._deleteConfirmationModal.hide();
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
