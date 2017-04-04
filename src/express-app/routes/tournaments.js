let express = require("express");
let router = express.Router();
let Tournament = require("../models/Tournament");
let Methods = require("../lib/Methods");

function handleError(res, msg, code = 500) {
  console.err(msg);

  res.status(code)
    .json({
      "error": msg
    });
}

router.get("/", (req, res) => {
  Tournament.find({}, (err, tournaments) => {
    if (err) {
      handleError(res, "Failed to get all tournaments: " + err.message);
      return;
    }

    res.status(200)
      .json(tournaments);
  });
});

router.post("/", (req, res) => {
  let tournament = new Tournament(req.body);

  // Initialize matches for newly created tournament
  // Then save tournaments
  // Then do http response
  Methods.initializeMatches(tournament)
    .then((tournament) => tournament.save())
    .then((tournament) => {
      res.status(201)
        .json(tournament);
    }).catch((err) => {
      handleError(res, "Failed to create tournament: " + err.message);
    });
});

router.get("/:id", (req, res) => {
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
      handleError(res, "Failed to get tournament: " + err.message);
      return;
    }

    res.status(200)
      .json(tournament);
  })
});

router.delete("/:id", (req, res) => {
  const _id = req.params.id;

  Tournament.findOne({ _id: _id }, (err, tournament) => {
    if (err) {
      handleError(res, "Failed to find tournament: " + err.message);      
      return;
    }

    tournament.remove((err) => {
      if (err) {
        handleError(res, "Failed to delete tournament: " + err.message);
        return;
      }

      res.status(200)
        .json(tournament);
    });
  });
});

module.exports = router;