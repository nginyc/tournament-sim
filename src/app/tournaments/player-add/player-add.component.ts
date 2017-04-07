import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-player-add',
  templateUrl: './player-add.component.html',
  styleUrls: ['./player-add.component.css']
})

export class PlayerAddComponent implements OnInit {

  player: any;

  @Output()
  onWantAddEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.player = {};
  }

  onWantAdd($event) {
    this.onWantAddEvent.emit({
      player: this.player
    });
  }

}
