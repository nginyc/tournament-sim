import { Injectable } from '@angular/core';
import { Match } from './match';
import { Player } from './player';
import { Tournament } from './tournament';
import { Http, Response } from '@angular/http';
import "rxjs/add/operator/toPromise";

@Injectable()
export class TournamentService {
    private readonly TOURNAMENTS_URI = "/api/tournaments";
    private readonly TOURNAMENT_URI = `${this.TOURNAMENTS_URI}/:id`;
    private readonly PLAYERS_URI = "/api/players";
    private readonly MATCHES_URI = "/api/matches";

    constructor(private http: Http) { }

    // Returns all tournaments, without full match and player data
    getTournaments(): Promise<Tournament[]> {
        const promise = this.http.get(this.TOURNAMENTS_URI)
            .toPromise()
            .then(response => response.json() as Tournament[]);

        return promise.catch(this.handleError);
    }

    // Returns all players
    getPlayers(): Promise<Player[]> {
        const promise = this.http.get(this.PLAYERS_URI)
            .toPromise()
            .then(response => response.json() as Player[]);

        return promise.catch(this.handleError);
    }

    // Returns tournament by id, with full match and player data
    getTournament(_id: string): Promise<Tournament> {
        const promise = this.http.get(this.TOURNAMENT_URI.replace(":id", _id))
            .toPromise()
            .then(response => response.json() as Tournament);

        return promise.catch(this.handleError);
    }

    // Create tournament, returning new tournament
    createTournament(tournament: Tournament): Promise<Tournament> {
        const promise = this.http.post(this.TOURNAMENTS_URI, tournament)
            .toPromise()
            .then(response => response.json() as Tournament);

        return promise.catch(this.handleError);
    }

    // Delete tournament, returning id of tournament deleted
    deleteTournament(_id: string): Promise<string> {
        const promise = this.http.delete(this.TOURNAMENT_URI.replace(":id", _id))
            .toPromise()
            .then(response => response.json() as string);

        return promise.catch(this.handleError);
    }

    private handleError(error: any) {
        const msg = (error.message) ? error.message :
            ((error.status) ? `${error.status} - ${error.statusText}` : "Server Error");

        console.error(msg);
    }

}