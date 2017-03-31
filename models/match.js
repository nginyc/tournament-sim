let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let schema = new Schema({
  player1_id: String,
  player2_id: String,
  winner_id: String
});

let Match = mongoose.model("Match", schema);
module.exports = Match;
