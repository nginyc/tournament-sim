import { Component, OnInit } from '@angular/core';
import { TournamentService } from "../tournament.service";
import { Router } from "@angular/router";

@Component({
  selector: 'tournament-add',
  templateUrl: './tournament-add.component.html',
  styleUrls: ['./tournament-add.component.css'],
  providers: [TournamentService]
})

export class TournamentAddComponent implements OnInit {

  tournament;

  constructor(private tournamentService: TournamentService, private router: Router) { }

  ngOnInit() {
    this.tournament = {
      players: []
    };
  }

  onWantAdd() {
    this.tournamentService.createTournament(this.tournament)
      .then((tournament) => {
        // Redirect to tournament play page
        this.router.navigate([`/tournament/${tournament._id}/play`]);
      });
  }

}
