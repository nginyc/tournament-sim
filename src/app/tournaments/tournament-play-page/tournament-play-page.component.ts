import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { TournamentService } from "../tournament.service";
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-tournament-play-page',
  templateUrl: './tournament-play-page.component.html',
  styleUrls: ['./tournament-play-page.component.css'],
  providers: [TournamentService]
})

export class TournamentPlayPageComponent implements OnInit {

  tournament: any = {};

  constructor(private tournamentService: TournamentService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    // For every change of :id, update current page's tournament
    this.activatedRoute.params
      .switchMap((params: Params) => {
        let _id = params["id"];
        return this.tournamentService.getTournament(_id, { ifPopMatches: true });
      }).subscribe(tournament => {
        this.tournament = tournament;
      });
  }

  onSelectMatchWinner({ match_id, winner_id }) {
    this.tournamentService.updateMatch(match_id, {
      winner: winner_id
    }).then((updatedMatch) => {
      this.tournament.matches = this.tournament.matches.map(x => {
        return (x._id == updatedMatch._id) ? updatedMatch : x;
      });
    });
  }
  
  onWantViewTournaments() {
    this.router.navigate(["/tournaments"]);
  }
}
