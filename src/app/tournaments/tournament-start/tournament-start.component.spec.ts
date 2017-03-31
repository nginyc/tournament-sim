import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentStartComponent } from './tournament-start.component';

describe('TournamentStartComponent', () => {
  let component: TournamentStartComponent;
  let fixture: ComponentFixture<TournamentStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
