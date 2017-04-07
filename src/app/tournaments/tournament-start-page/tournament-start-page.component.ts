import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../tournament.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './tournament-start-page.component.html',
  styleUrls: ['./tournament-start-page.component.css'],
  providers: [TournamentService]
})

export class TournamentStartPageComponent implements OnInit {

  players = [];

  constructor(private tournamentService: TournamentService, private router: Router) { }

  ngOnInit() {
    this.tournamentService
      .getPlayers()
      .then((players: any[]) => {
        this.players = players;
      });
  }

  onWantAddTournament({ tournament }) {
    this.tournamentService.createTournament(tournament)
      .then((tournament) => {
        // Redirect to tournament play page
        this.router.navigate([`/tournament/${tournament._id}/play`]);
      });
  }

  onWantDeletePlayer({ player_id }) {
    this.tournamentService.deletePlayer(player_id)
      .then((player) => {
        // Remove from players array after deletion from database
        this.players.splice(this.players.indexOf(player._id), 1);
      });
  }

  onWantAddPlayer({ player }) {
    this.tournamentService.createPlayer(player)
      .then((player) => {
        this.players.push(player);
      });
  }

  onWantViewTournaments() {
    this.router.navigate(['/tournaments']);
  }
}
