import { TournamentService } from '../tournament.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tournaments-list',
  templateUrl: './tournaments-list.component.html',
  styleUrls: ['./tournaments-list.component.css'],
  providers: [TournamentService]
})
export class TournamentsListComponent implements OnInit {

  _tournaments: any[];

  constructor(private router: Router, private tournamentService: TournamentService) { }

  ngOnInit() {
    this.tournamentService
      .getTournaments()
      .then((tournaments: any[]) => {
        this._tournaments = tournaments;
      });
  }

  _onWantAdd() {
    this.router.navigate(['/tournament/start']);
  }

  _onSelect(tournament) {
    this.router.navigate([`/tournament/${tournament._id}/play`]);
  }

}
