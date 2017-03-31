import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from './app.component';
import { TournamentsListComponent } from './tournaments/tournaments-list/tournaments-list.component';
import { TournamentStartComponent } from './tournaments/tournament-start/tournament-start.component';

const appRoutes: Routes = [
  { path: "tournament/start", component: TournamentStartComponent },
  { path: "", pathMatch: "full", component: TournamentsListComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TournamentsListComponent,
    TournamentStartComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
