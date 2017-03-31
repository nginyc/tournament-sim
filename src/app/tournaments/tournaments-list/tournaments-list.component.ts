import { Component, OnInit } from '@angular/core';
import { TournamentService } from "../tournament.service";
import { Location } from "@angular/common"

@Component({
  selector: 'tournaments-list',
  templateUrl: './tournaments-list.component.html',
  styleUrls: ['./tournaments-list.component.css'],
  providers: [TournamentService]
})

export class TournamentsListComponent implements OnInit {

  tournaments: any[];

  constructor(private tournamentService: TournamentService,
    private location: Location) { }

  ngOnInit() {
    this.tournamentService
      .getTournaments()
      .then((tournaments: any[]) => {
        this.tournaments = tournaments;
      });
  }

  onWantAdd($event: Event) {
    location.assign("/tournament/start");
  }

}
