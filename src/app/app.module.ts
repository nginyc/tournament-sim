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

@NgModule({
  declarations: [
    AppComponent,
    TournamentsListComponent,
    TournamentStartPageComponent,
    PlayersListComponent,
    PlayerAddComponent,
    TournamentsPageComponent
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
