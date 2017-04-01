import { Component, OnInit } from '@angular/core';
import { TournamentService } from "../tournament.service";
import { Router } from "@angular/router";

@Component({
  selector: 'tournaments-list',
  templateUrl: './tournaments-list.component.html',
  styleUrls: ['./tournaments-list.component.css'],
  providers: [TournamentService]
})

export class TournamentsListComponent implements OnInit {

  tournaments: any[] = [];

  constructor(private tournamentService: TournamentService,
    private router: Router) { }

  ngOnInit() {
    this.tournamentService
      .getTournaments()
      .then((tournaments: any[]) => {
        this.tournaments = tournaments;
      });
  }

  onWantAdd() {
    this.router.navigate(["/tournament/start"]);
  }

  onSelect(tournament) {
    this.router.navigate([`/tournament/${tournament._id}/play`]);
  }

}
