import { Router } from '@angular/router';
import { TournamentService } from '../tournament.service';
import { PlayersListComponent } from '../players-list/players-list.component';
import { Component, OnInit, Output, Input, EventEmitter, ViewChild } from '@angular/core';

class Tournament {
  name: string;
  players = [];
  type = TournamentAddComponent.TYPES[0];

  constructor(name: string) {
    this.name = name;
  }
}

@Component({
  selector: 'app-tournament-add',
  templateUrl: './tournament-add.component.html',
  styleUrls: ['./tournament-add.component.css'],
  providers: [TournamentService]
})
export class TournamentAddComponent implements OnInit {

  static readonly TYPES = ['ROUND_ROBIN'];

  _tournament: Tournament;

  constructor(private tournamentService: TournamentService, private router: Router) { }

  ngOnInit() {
    this.reload();
  }

  reload() {
    this._tournament = new Tournament(this.tournamentService.getRandomSampleTournamentTitle());
  }

  onWantAdd() {
    this.tournamentService.createTournament(this._tournament)
      .then((tournament) => {
        // Redirect to tournament play page
        this.router.navigate([`/tournament/${tournament._id}/play`]);
      });
  }
}
