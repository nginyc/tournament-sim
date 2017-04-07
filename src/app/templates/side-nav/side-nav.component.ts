import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  _route: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((routes: RoutesRecognized) => {
      if (this._containsString('tournament', routes.url)) {
        this._route = 'tournament';
      } else if (this._containsString('player', routes.url)) {
        this._route = 'player';
      }
    });
  }

  _containsString(str: string, url: string) {
    return url.indexOf(str) != -1;
  }
}
