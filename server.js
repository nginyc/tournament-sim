let express = require("express");
let bodyParser = require("body-parser");
let mongodb = require("mongodb");
let mongoose = require("mongoose");
let app = express();

app.use(bodyParser.json());

// Create link to Angular build directory
const ANGULAR_DIR = __dirname + "/dist/";
app.use(express.static(ANGULAR_DIR));

// Constants
const TOURNAMENTS_URI = "/api/tournaments";
const TOURNAMENT_URI = `${TOURNAMENTS_URI}/:id`;
const PLAYERS_URI = "/api/players";
const PLAYER_URI = `${PLAYERS_URI}/:id`;
const MATCHES_URI = "/api/matches";
const MATCH_URI = `${MATCHES_URI}/:id`;

let Tournament = require("./tournaments/models/tournament");
let Player = require("./tournaments/models/player");
let Match = require("./tournaments/models/match");
let Methods = require("./tournaments/methods");

mongoose.Promise = Promise; // Use JS Promise so that mongoose doesn't complain
mongoose.connect(process.env.MONGODB_URI || process.env.MONGODB_URI_LOCAL);

let db = mongoose.connection;

db.on("error", (err) => {
  console.error(err);
  process.exit(1);
});

// Initialize the app upon database connection
db.once("open", () => {
  console.log("Database connection ready");


  let server = app.listen(process.env.PORT || 8080, () => {
    let port = server.address().port;

    console.log("App is now running on port", port);
  });
});

// Generic error handler used by all endpoints.
function handleError(res, reason, message = "", code = null) {
  console.log("ERROR: " + reason);

  res.status(code || 500)
    .json({
      "error": message
    });
}

/*
    Back-end for CRUD of Tournaments
*/

app.get(TOURNAMENTS_URI, (req, res) => {

  Tournament.find({}, (err, tournaments) => {
    if (err) {
      handleError(res, err.message, "Failed to get all tournaments");
      return;
    }

    res.status(200)
      .json(tournaments);
  });

});

app.post(TOURNAMENTS_URI, (req, res) => {
  let tournament = new Tournament(req.body);

  // Initialize matches for newly created tournament
  // Then save tournaments
  // Then do http response
  Methods.initializeMatches(tournament)
    .then((tournament) => tournament.save())
    .then((tournament) => {
      res.status(201)
        .json(tournament);
    }).catch((error) => {
      handleError(res, error);
    });
});

app.get(TOURNAMENT_URI, (req, res) => {
  const _id = req.params.id;

  const ifPopMatches = +req.query.matches ? true : false;
  const ifPopPlayers = +req.query.players ? true : false;

  let query = Tournament.findOne({ _id: _id });

  if (ifPopMatches) {
    query = query.populate({
      path: "matches",
      populate: {
        path: "player1 player2 winner"
      }
    });
  }

  if (ifPopPlayers) {
    query = query.populate("players");
  }

  return query.exec((err, tournament) => {
    if (err) {
      handleError(res, err.message, "Failed to get tournament");
      return;
    }

    res.status(200)
      .json(tournament);
  })
});

app.delete(TOURNAMENT_URI, (req, res) => {
  const _id = req.params.id;

  Tournament.findOne({ _id: _id }, (err, tournament) => {
    if (err) {
      handleError(res, err.message, "No such tournament");
      return;
    }

    tournament.remove((err) => {
      if (err) {
        handleError(res, err.message, "Failed to delete tournament");
        return;
      }

      res.status(200)
        .json(tournament);
    });
  });
});


/*
    Back-end for CRUD of Players
*/

app.get(PLAYERS_URI, (req, res) => {
  Player.find({}, (err, players) => {
    if (err) {
      handleError(res, err.message, "Failed to get all players");
      return;
    }

    res.status(200)
      .json(players);
  });
});

app.post(PLAYERS_URI, (req, res) => {
  let player = new Player(req.body);

  player.save((err, player) => {
    if (err) {
      handleError(res, err.message, "Failed to add player");
      return;
    }

    res.status(201)
      .json(player);
  });
});

app.get(PLAYER_URI, (req, res) => {
  const _id = req.params.id;

  Player.findOne({ _id: _id }, (err, player) => {
    if (err) {
      handleError(res, err.message, "No such player");
      return;
    }

    res.status(200)
      .json(player);
  });
});

app.delete(PLAYER_URI, (req, res) => {
  const _id = req.params.id;

  Player.findOne({ _id: _id }, (err, player) => {
    if (err) {
      handleError(res, err.message, "No such player");
      return;
    }

    player.remove((err) => {
      if (err) {
        handleError(res, err.message, "Failed to delete player");
        return;
      }

      res.status(200)
        .json(player);
    });
  });
});

// Update match by winner
app.put(MATCH_URI, (req, res) => {
  const _id = req.params.id;

  const $set = {};

  if (req.body.winner) $set.winner = req.body.winner;

  let query = Match.findByIdAndUpdate(_id, { $set: $set }, { new: true });

  query = query.populate({
    path: "player1 player2 winner"
  });

  query.exec((err, match) => {
    if (err) {
      handleError(res, err.message, "Failed to update match");
      return;
    }

    res.status(202)
      .json(match);
  });
});

// Pass routing to Angular
app.use("/*", (req, res) => {
  res.sendFile(`${ANGULAR_DIR}/index.html`);
});