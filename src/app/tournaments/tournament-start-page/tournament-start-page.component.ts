import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './tournament-start-page.component.html',
  styleUrls: ['./tournament-start-page.component.css']
})

export class TournamentStartPageComponent implements OnInit {

  tournament;

  constructor() { }

  ngOnInit() {
    this.tournament = {};
  }

}
