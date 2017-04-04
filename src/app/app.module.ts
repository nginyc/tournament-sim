import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from "@angular/router";
import { AppRoutes } from "./app.routes";
import { AppComponent } from './app.component';
import { TournamentsListComponent } from './tournaments/tournaments-list/tournaments-list.component';
import { TournamentStartPageComponent } from './tournaments/tournament-start-page/tournament-start-page.component';
import { PlayersListComponent } from './tournaments/players-list/players-list.component';
import { PlayerAddComponent } from './tournaments/player-add/player-add.component';
import { TournamentsPageComponent } from './tournaments/tournaments-page/tournaments-page.component';
import { TournamentAddComponent } from './tournaments/tournament-add/tournament-add.component';
import { TournamentPlayPageComponent } from './tournaments/tournament-play-page/tournament-play-page.component';
import { MatchesListComponent } from './tournaments/matches-list/matches-list.component';
import { LeaderboardComponent } from './tournaments/leaderboard/leaderboard.component';

@NgModule({
  declarations: [
    AppComponent,
    TournamentsListComponent,
    TournamentStartPageComponent,
    PlayersListComponent,
    PlayerAddComponent,
    TournamentsPageComponent,
    TournamentAddComponent,
    TournamentPlayPageComponent,
    MatchesListComponent,
    LeaderboardComponent
  ],
  imports: [
    RouterModule.forRoot(AppRoutes),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
