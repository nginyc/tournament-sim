import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentPlayPageComponent } from './tournament-play-page.component';

describe('TournamentPlayPageComponent', () => {
  let component: TournamentPlayPageComponent;
  let fixture: ComponentFixture<TournamentPlayPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentPlayPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentPlayPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
