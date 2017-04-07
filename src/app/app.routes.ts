import { Routes } from '@angular/router';

import { TournamentsPageComponent } from './tournaments/tournaments-page/tournaments-page.component';
import { TournamentStartPageComponent } from './tournaments/tournament-start-page/tournament-start-page.component';
import { TournamentPlayPageComponent } from './tournaments/tournament-play-page/tournament-play-page.component';

export let AppRoutes: Routes = [
  { path: 'tournament/:id/play', component: TournamentPlayPageComponent },
  { path: 'tournament/start', component: TournamentStartPageComponent },
  { path: 'tournaments', component: TournamentsPageComponent },
  { path: '', pathMatch: 'full', redirectTo: 'tournaments' }
]