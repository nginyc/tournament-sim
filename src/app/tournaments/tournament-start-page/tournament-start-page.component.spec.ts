import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentStartPageComponent } from './tournament-start-page.component';

describe('TournamentStartComponent', () => {
  let component: TournamentStartPageComponent;
  let fixture: ComponentFixture<TournamentStartPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TournamentStartPageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentStartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
