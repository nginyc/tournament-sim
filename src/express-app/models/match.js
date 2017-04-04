let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

let schema = new Schema({
  player1: { type: ObjectId, ref: "Player", required: true },
  player2: { type: ObjectId, ref: "Player", required: true },
  winner: { type: ObjectId, ref: "Player", default: null }
});

let Match = mongoose.model("Match", schema);
module.exports = Match;
