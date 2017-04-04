let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

let schema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ["ROUND_ROBIN"]
  },
  players: [{
    type: ObjectId,
    required: true,
    ref: "Player"
  }],
  matches: [{
    type: ObjectId,
    ref: "Match",
    default: []
  }]
});


let Tournament = mongoose.model("Tournament", schema);
module.exports = Tournament;
