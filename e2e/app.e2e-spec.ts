import { TournamentSimPage } from './app.po';

describe('tournament-sim App', () => {
  let page: TournamentSimPage;

  beforeEach(() => {
    page = new TournamentSimPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
