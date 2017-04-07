import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from './app.routes';
import { AppComponent } from './app.component';
import { TournamentsListComponent } from './tournaments/tournaments-list/tournaments-list.component';
import { PlayersListComponent } from './tournaments/players-list/players-list.component';
import { PlayerAddComponent } from './tournaments/player-add/player-add.component';
import { TournamentAddComponent } from './tournaments/tournament-add/tournament-add.component';
import { MatchesListComponent } from './tournaments/matches-list/matches-list.component';
import { TournamentPlayComponent } from './tournaments/tournament-play/tournament-play.component';
import { LeaderboardComponent } from './tournaments/leaderboard/leaderboard.component';
import { ConfirmationModalComponent } from './templates/confirmation-modal/confirmation-modal.component';
import { SideNavComponent } from './templates/side-nav/side-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    TournamentsListComponent,
    PlayersListComponent,
    PlayerAddComponent,
    TournamentAddComponent,
    MatchesListComponent,
    LeaderboardComponent,
    TournamentPlayComponent,
    ConfirmationModalComponent,
    SideNavComponent
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
