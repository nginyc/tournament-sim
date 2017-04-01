import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { TournamentService } from "../tournament.service";
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-tournament-play-page',
  templateUrl: './tournament-play-page.component.html',
  styleUrls: ['./tournament-play-page.component.css'],
  providers: [TournamentService]
})

export class TournamentPlayPageComponent implements OnInit {

  tournament = {};

  constructor(private tournamentService: TournamentService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    // For every change of :id, update current page's tournament
    this.activatedRoute.params
      .switchMap((params: Params) => {
        let _id = params["id"];
        return this.tournamentService.getTournament(_id);
      }).subscribe(tournament => {
        this.tournament = tournament;
      });
  }

}
