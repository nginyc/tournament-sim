import { Component, OnInit } from '@angular/core';
import { TournamentService } from "../tournament.service";

@Component({
  selector: 'tournaments-page',
  templateUrl: './tournaments-page.component.html',
  styleUrls: ['./tournaments-page.component.css'],
  providers: [ TournamentService ]
})

export class TournamentsPageComponent implements OnInit {

  tournaments = [];
  players = [];

  constructor(private tournamentService: TournamentService) { }

  ngOnInit() {
    this.tournamentService
      .getTournaments()
      .then((tournaments: any[]) => {
        this.tournaments = tournaments;
      });
      
    this.tournamentService
      .getPlayers()
      .then((players: any[]) => {
        this.players = players;
      });
  }
  
  onWantDeletePlayer({player_id}) {
    this.tournamentService.deletePlayer(player_id)
      .then((player) => {
        // Remove from players array after deletion from database
        this.players.splice(this.players.indexOf(player._id), 1);
      });
  }
  
  onWantAddPlayer({player}) {
    this.tournamentService.createPlayer(player)
      .then((player) => {
        this.players.push(player);
      });
  }

}
