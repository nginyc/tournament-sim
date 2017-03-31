import { Routes } from "@angular/router";

import { TournamentsPageComponent } from "./tournaments/tournaments-page/tournaments-page.component";
import { TournamentStartComponent } from "./tournaments/tournament-start/tournament-start.component";

export let AppRoutes: Routes = [
  { path: "tournament/start", component: TournamentStartComponent },
  { path: "tournaments", component: TournamentsPageComponent },
  { path: "", pathMatch: "full", redirectTo: "tournaments" }
]