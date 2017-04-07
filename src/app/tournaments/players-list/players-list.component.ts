import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.css']
})

export class PlayersListComponent implements OnInit, OnChanges {

  isAdding = false;

  deleteModalMessage = '';
  deleteModalTitle = 'Confirm Delete?';
  isDeleteModalShown = false;
  playerForDeletion?;

  @Input()
  players: any[];

  @Input()
  selectedPlayerIds = [];

  @Input()
  isSelectMode = false;

  @Output()
  onWantDeleteEvent = new EventEmitter();

  @Output()
  onWantAddEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // If selected players or players have changed, re-initialize required properties
    if (changes.selectedPlayerIds && !changes.selectedPlayerIds.firstChange) {
      this.initializeSelectedPlayers(this.players, changes.selectedPlayerIds.currentValue);
    }

    if (changes.players && !changes.players.firstChange) {
      this.initializeSelectedPlayers(changes.players.currentValue, this.selectedPlayerIds);
    }
  }

  initializeSelectedPlayers(players: any[], selectedPlayerIds: string[]) {
    // Reconcile with players array
    for (let player of players) {
      player.isSelected = (player._id in selectedPlayerIds);
    }
  }

  onSelect(player) {
    // Only for select mode active
    if (!this.isSelectMode) {
      return;
    }

    player.isSelected = !player.isSelected;

    // Update selected players array
    if (player.isSelected) {
      this.selectedPlayerIds.push(player._id);
    } else {
      this.selectedPlayerIds.splice(this.selectedPlayerIds.indexOf(player._id), 1);
    }
  }

  onWantDelete(player) {
    this.playerForDeletion = player;
    this.isDeleteModalShown = true;
    this.deleteModalMessage = `Are you sure you want to delete ${player.name}? This player will be removed from all tournaments!`;
  }

  onDeleteCancel() {
    this.playerForDeletion = null;
    this.isDeleteModalShown = false;
  }

  onDeleteConfirm() {
    this.onWantDeleteEvent.emit({
      player_id: this.playerForDeletion._id
    });

    this.playerForDeletion = null;
    this.isDeleteModalShown = false;
  }

  onWantViewAdd() {
    this.isAdding = true;
  }

  onWantAdd({ player }) {
    this.isAdding = false;

    this.onWantAddEvent.emit({
      player: player
    });
  }
}
