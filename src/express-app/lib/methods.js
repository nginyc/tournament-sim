import Match from "../models/match";

// Assumption: Mongoose has been connected

// Returns a promise that resolves with (tournament) after matches have been initialized
export function initializeMatches(tournament) {
  let p = tournament.players;
  let ms = tournament.matches;

  // Clear matches array
  ms.splice(0, ms.length);

  let promises = [];

  for (let i = 0; i < p.length; i++) {
    for (let j = i + 1; j < p.length; j++) {
      let match = new Match({
        player1: p[i],
        player2: p[j]
      });

      promises.push(new Promise((resolve, reject) => {
        match.save((err, match) => {
          if (err) {
            reject("Failed to add match for tournament: " + err.message);
            return;
          }

          ms.push(match);

          resolve(tournament);
        });
      }));
    }
  }

  return Promise.all(promises)
    .then(() => tournament);
}