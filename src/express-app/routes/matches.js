import Match from "../models/match";

let express = require("express");
let router = express.Router();

function handleError(res: {}, msg: {}, code: number = 500) {
  console.error(msg);

  res.status(code)
    .json({
      "error": msg
    });
}

// Update match by winner
router.put("/:id", (req: {}, res: {}) => {
  const _id = req.params.id;

  const $set = {};

  if (req.body.winner) $set.winner = req.body.winner;

  let query = Match.findByIdAndUpdate(_id, { $set: $set }, { new: true });

  query = query.populate({
    path: "player1 player2 winner"
  });

  query.exec((err: {}, match: {}) => {
    if (err) {
      handleError(res, "Failed to update match: " + err.message);
      return;
    }

    res.status(202)
      .json(match);
  });
});

module.exports = router;