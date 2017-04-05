let express = require("express");
let router = express.Router();
let Player = require("../models/Player");

function handleError(res, msg, code = 500) {
  console.error(msg);

  res.status(code)
    .json({
      "error": msg
    });
}

router.get("/", (req, res) => {
  Player.find({}, (err, players) => {
    if (err) {
      handleError(res, "Failed to get all players: " + err.message);
      return;
    }

    res.status(200)
      .json(players);
  });
});

router.post("/", (req, res) => {
  let player = new Player(req.body);

  player.save((err, player) => {
    if (err) {
      handleError(res, "Failed to add player: " + err.message);
      return;
    }

    res.status(201)
      .json(player);
  });
});

router.get("/:id", (req, res) => {
  const _id = req.params.id;

  Player.findOne({ _id: _id }, (err, player) => {
    if (err) {
      handleError(res, "Failed to find player: " + err.message);
      return;
    }

    res.status(200)
      .json(player);
  });
});

router.delete("/:id", (req, res) => {
  const _id = req.params.id;

  Player.findOne({ _id: _id }, (err, player) => {
    if (err) {
      handleError(res, err.message, "No such player");
      return;
    }

    player.remove((err) => {
      if (err) {
        handleError(res, "Failed to delete player: " + err.message);
        return;
      }

      res.status(200)
        .json(player);
    });
  });
});

module.exports = router;