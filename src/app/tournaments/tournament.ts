import { Player } from "./player";
import { Match } from "./match";

enum Type {
    ROUND_ROBIN
}

export class Tournament {
    static Type = Type;

    _id?: string;
    name: string;
    type: Type;
    player_ids: number[];
    players?: Player[];
    match_ids: number[];
    matches?: Match[];
}
