import { Component, OnInit } from '@angular/core';
import { Tournament } from "../tournament";
import { TournamentService } from "../tournament.service";
import { loca } from "@angular/common"

@Component({
  selector: 'tournaments-list',
  templateUrl: './tournaments-list.component.html',
  styleUrls: ['./tournaments-list.component.css'],
  providers: [TournamentService]
})

export class TournamentsListComponent implements OnInit {

  tournaments: Tournament[];

  constructor(private tournamentService: TournamentService,
    private location: Location) { }

  ngOnInit() {
    this.tournamentService
      .getTournaments()
      .then((tournaments: Tournament[]) => {
        this.tournaments = tournaments;
      });
  }

  onWantAdd($event: Event) {
    location.assign("/tournaments/start");
  }

}
