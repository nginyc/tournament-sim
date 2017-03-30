import { Component, OnInit } from '@angular/core';
import { Tournament } from "../tournament";
import { TournamentService } from "../tournament.service";

@Component({
  selector: 'tournaments-list',
  templateUrl: './tournaments-list.component.html',
  styleUrls: ['./tournaments-list.component.css'],
  providers: [TournamentService]
})

export class TournamentsListComponent implements OnInit {

  tournaments: Tournament[];

  constructor(private tournamentService: TournamentService) { }

  ngOnInit() {
    this.tournamentService
      .getTournaments()
      .then((tournaments: Tournament[]) => {
        this.tournaments = tournaments;
      });
  }

}
