import Match from "../models/match";

// Randomly shuffles array
function shuffleArray(array: []) {
  let size = array.length;
  for (let i = size - 1; i >= 0; i--) {
    // Invariant: [0..i] is part of original array, while [i+1..size-1] has been randomly picked
    const randomI = Math.floor(Math.random() * (i + 1));
    const temp = array[i + 1];
    array[i + 1] = array[randomI];
    array[randomI] = temp;
  }
}

type TournamentType = {
  players: [],
  matches: MatchType[]
};

type MatchType = {
  player1: string,
  player2: string
};

// Assumption: Mongoose has been connected
// Returns a promise that resolves with (tournament) after matches have been initialized
export function initializeMatches(tournament: TournamentType): Promise<TournamentType> {
  let p = tournament.players;
  let ms = tournament.matches;

  // Clear matches array
  ms.splice(0, ms.length);

  let promises = [];

  for (let i = 0; i < p.length; i++) {
    for (let j = i + 1; j < p.length; j++) {
      let match: MatchType = new Match({
        player1: p[i],
        player2: p[j]
      });

      promises.push(new Promise((resolve: (TournamentType) => void, reject: (string) => void) => {
        match.save((err: {}, match: MatchType) => {
          if (err) {
            reject("Failed to add match for tournament: " + err.message);
            return;
          }

          ms.push(match);

          resolve();
        });
      }));
    }
  }

  return Promise.all(promises)
    .then((): {} => {
      shuffleArray(ms);
      return tournament;
    });
}

