import { TournamentPlayComponent } from './tournaments/tournament-play/tournament-play.component';
import { TournamentAddComponent } from './tournaments/tournament-add/tournament-add.component';
import { PlayersListComponent } from './tournaments/players-list/players-list.component';
import { TournamentsListComponent } from './tournaments/tournaments-list/tournaments-list.component';
import { Routes } from '@angular/router';

export let AppRoutes: Routes = [
  { path: 'tournament/:id/play', component: TournamentPlayComponent },
  { path: 'tournament/start', component: TournamentAddComponent },
  { path: 'players', component: PlayersListComponent },
  { path: 'tournaments', component: TournamentsListComponent },
  { path: '', pathMatch: 'full', redirectTo: 'tournaments' }
]