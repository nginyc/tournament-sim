import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tournaments-list',
  templateUrl: './tournaments-list.component.html',
  styleUrls: ['./tournaments-list.component.css']
})
export class TournamentsListComponent implements OnInit {

  @Input()
  tournaments: any[];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onWantAdd() {
    this.router.navigate(['/tournament/start']);
  }

  onSelect(tournament) {
    this.router.navigate([`/tournament/${tournament._id}/play`]);
  }

}
