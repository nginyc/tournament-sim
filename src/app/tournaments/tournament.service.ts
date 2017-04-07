import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TournamentService {
  private readonly TOURNAMENTS_URI = '/api/tournaments';
  private readonly TOURNAMENT_URI = `${this.TOURNAMENTS_URI}/:id`;
  private readonly PLAYERS_URI = '/api/players';
  private readonly PLAYER_URI = `${this.PLAYERS_URI}/:id`;
  private readonly MATCHES_URI = '/api/matches';
  private readonly MATCH_URI = `${this.MATCHES_URI}/:id`;
  private readonly PLAYER_SAMPLE_NAMES = JSON.parse(`["Ron","Jouske","Moyashi","Ruoka Dancho","SuPeRbOoMfAn",
  "Kikoushi","Jun","Gerson","wario","Prince","Isai","Alvin","wangera","kysk","TBD","J.R. Castillo","Justin Junio",
  "Recipherus","Ken","Azen","ChuDat","PC Chris","Mew2King","Amsah","Mango","Armada","Hungrybox","PPMD","Leffen",
  "Hax","DSF","Ally","ADHD","Glutonny","DEHF","Gnes","Otori","Dabuz","Nairo","ESAM","Rain","Salem","Vinnie","9B",
  "Edge","Nietono","Choco","ZeRo","J.Miller","MkLeo","Ranai","SH","Abadango","Mr.R","Larry Lurr","ANTi","Pink Fresh",
  "KEN","Komorikiri","Kirihara","Kirk","Emukiller","Wizzrobe","Sethlon","Junebug","Professor Pro","MrLz","Flipp",
  "ThundeRzReiGN","Sosa","Malachi"]`);
  private readonly TOURNAMENT_SAMPLE_TITLES = JSON.parse(`["1st Kansai","4th Kanto","3rd Kansai","5th Kanto",
  "1st Osaka University","GENESIS","4th Kansai","6th Kanto","2nd Osaka University","Apex","Tacna Torneo Nacional",
  "5th Kansai","7th Kanto","Chuo University","6th Kansai","Zenith","Kanto","Kansai","Tacna","Smash of Ages",
  "Super Smash Con","Hitstun","Pound","Get On My Level","Snosa II","Shine","Operation Desert Smash II",
  "SuperBoomed","Boss Battle","Don't Park on the Grass","Japan Smash Cup","Tacna All Stars","B.E.A.S.T",
  "Keystoned","Frame Perfect Series","CEO Dreamland","Let's Go!","Smash 'N' Splash","Snosa III","Tournament Go",
  "Game Over","MELEE-FC1","MLG New York","MOAST","MLG DC","MLG San Francisco","Gettin' Schooled",
  "MELEE-FC3","Jack Garden Tournament","BOMB","MLG Atlanta","MLG New York Opener","MLG Dallas","MLG Anaheim",
  "MELEE-FC6","MLG Chicago","Zero Challenge","MLG Orlando","MLG New York Playoffs","MLG Las Vegas","Cataclysm",
  "The Renaissance of Smash","MELEE-FC Diamond","EVO West","EVO World","Super Champ Combo","Viva La Smashtaclysm",
  "Epita Smash Arena","Revival of Melee","SMASH ATTACK","Super Lion","Smash Needs You","Pound V","B.E.A.S.T II",
  "IMPULSE","Smashers' Reunion: Melee Grande","MELEE-FC10R Legacy","The Big House","EVO","Kings of Cali",
  "Republic of Fighters","Pat's House","SKTAR","Super SWEET","CEO","Tipped Off","Do You Fox Wit It?","Forte",
  "Paragon Orlando","I'm Not Yelling!","Sandstorm","DrømmeLAN.5","Press Start","Battle Arena Melbourne",
  "FC SmashXR: Return","WTFox","Heir II the Throne","PAX Prime","Paragon Los Angeles","HTC Throwdown",
  "DreamHack London","Helix","MLG World Finals","Smash Summit","Eclipse","DreamHack Winter","PAX Arena",
  "Battle of the Five Gods","Enthusiast Gaming Live Expo","DreamHack Austin","Low Tier City","DreamHack Summer",
  "Clutch City Clash","Heir","Syndicate","Canada Cup","UGC Smash Open","Smash Summit Spring","Full Bloom",
  "Smash Rivalries","HFLAN Melee Edition","Royal Flush","Battle of BC","DreamHack Atlanta","DreamHack Montreal",
  "DreamHack Denver","Critical Hit","FAST","AxisGaming","Clash of the Titans IV","WHOBO","S.N.E.S.","MLG Columbus",
  "Bushido Brawl Impact","MLG Raleigh","Winter Game Fest VI","Sun Rise Tournament","Sumabato X Final","Umebura",
  "Sumabato","The Come Up","Double Vegas Down Attack","Final Battle","Shots Fired","Smash Factor","Umebura F.A.T.",
  "Umebura Niconico Qualifiers","Sumabato Niconico Qualifiers","Dismantle","Niconico Tokaigi","2GGT: FOW Saga",
  "LVL UP EXPO","MomoCon","2GGT: Mexico Saga","KTAR XVIII","2GGT: KTAR Saga","Umebura S.A.T.","2GGT: Abadango Saga",
  "KTAR XIX","Smashdown World","2GGT: ZeRo Saga","Single Game Championships: Umebura X Single-Chu",
  "2GGC: GENESIS Saga","Umebura Tokaigi Qualifiers","2GGC: Midwest Mayhem Saga","Frostbite",
  "PAX Arena at PAX East","2GGC: Civil War","KTAR XX","Midwest Mayhem: North American Tour",
  "Umebura Japan Major","2GGC: Greninja Saga","2GGC: Nairo Saga","2GG Championship","GUTS","Aftershock",
  "We Tech Those","FinalBOSS","SuperNova","The Big Balc","Olympus","Rewired","Cashed Out","The Flex Zone",
  "Frozen Phoenix","The Bigger Balc"]`);

  constructor(private http: Http) { }

  // Create a player
  createPlayer(player): Promise<any> {
    const promise = this.http.post(this.PLAYERS_URI, player)
      .toPromise()
      .then(response => response.json() as any);

    return promise.catch(this.handleError);
  }

  // Returns all players
  getPlayers(): Promise<any[]> {
    const promise = this.http.get(this.PLAYERS_URI)
      .toPromise()
      .then(response => response.json() as any[]);

    return promise.catch(this.handleError);
  }

  // Delete a player
  deletePlayer(_id: string): Promise<any> {
    const promise = this.http.delete(this.PLAYER_URI.replace(':id', _id))
      .toPromise()
      .then(response => response.json());

    return promise.catch(this.handleError);
  }

  // Get a tournament by id, optionally populating its matches and players
  getTournament(_id: string,
    options: {
      ifPopPlayers?: boolean,
      ifPopMatches?: boolean
    } = {
        ifPopPlayers: false,
        ifPopMatches: false
      }
  ): Promise<any> {

    const promise = this.http.get(this.TOURNAMENT_URI.replace(':id', _id), {
      params: {
        matches: options.ifPopMatches ? 1 : 0,
        players: options.ifPopPlayers ? 1 : 0
      }
    })
      .toPromise()
      .then(response => response.json());

    return promise.catch(this.handleError);
  }

  // Returns all tournaments, without full match and player data
  getTournaments(): Promise<any[]> {
    const promise = this.http.get(this.TOURNAMENTS_URI)
      .toPromise()
      .then(response => response.json() as any[]);

    return promise.catch(this.handleError);
  }

  // Create tournament, returning new tournament
  createTournament(tournament): Promise<any> {
    const promise = this.http.post(this.TOURNAMENTS_URI, tournament)
      .toPromise()
      .then(response => response.json());

    return promise.catch(this.handleError);
  }

  // Delete tournament, returning id of tournament deleted
  deleteTournament(_id: string): Promise<string> {
    const promise = this.http.delete(this.TOURNAMENT_URI.replace(':id', _id))
      .toPromise()
      .then(response => response.json());

    return promise.catch(this.handleError);
  }

  // Update match by winner
  updateMatch(_id: string, matchPart) {
    const promise = this.http.put(this.MATCH_URI.replace(':id', _id), matchPart)
      .toPromise()
      .then(response => response.json());

    return promise.catch(this.handleError);
  }

  getRandomSampleTournamentTitle(): string {
    return this.TOURNAMENT_SAMPLE_TITLES[Math.floor(Math.random() * this.TOURNAMENT_SAMPLE_TITLES.length)];
  }

  getRandomSamplePlayerName(): string {
    return this.PLAYER_SAMPLE_NAMES[Math.floor(Math.random() * this.PLAYER_SAMPLE_NAMES.length)];
  }

  private handleError(error) {
    const msg = (error.message) ? error.message :
      ((error.status) ? `${error.status} - ${error.statusText}` : 'Server Error');

    console.error(msg);
  }

}
