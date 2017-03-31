import { Component, OnInit } from '@angular/core';
import { Tournament } from "../tournament";

@Component({
  templateUrl: './tournament-start.component.html',
  styleUrls: ['./tournament-start.component.css']
})

export class TournamentStartComponent implements OnInit {

  tournament: Tournament;

  constructor() { }

  ngOnInit() {
    this.tournament = new Tournament();
  }

}
