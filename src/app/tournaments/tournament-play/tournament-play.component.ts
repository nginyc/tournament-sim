import { LeaderboardComponent } from '../leaderboard/leaderboard.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TournamentService } from '../tournament.service';

interface Match {
}

interface Tournament {
  matches: Match[];
}

@Component({
  selector: 'app-tournament-play',
  templateUrl: './tournament-play.component.html',
  styleUrls: ['./tournament-play.component.css'],
  providers: [TournamentService]
})
export class TournamentPlayComponent implements OnInit {

  _tournamentId: string;
  _tournament: Tournament;

  constructor(private tournamentService: TournamentService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // For every change of :id, update current page's tournament
    this.activatedRoute.params
      .subscribe((params: Params) => {
        this._tournamentId = params['id'];
        this.updateTournament();
      });
  }

  updateTournament() {
    this.tournamentService.getTournament(this._tournamentId, { ifPopMatches: true })
      .then((tournament: Tournament) => {
        this._tournament = tournament;
      });
  }
}
