let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

let schema = new Schema({
  name: String,
  type: {
    type: String,
    enum: ["ROUND_ROBIN"]
  },
  players: [{
    type: ObjectId,
    ref: "Player"
  }],
  matches: [{
    type: ObjectId,
    ref: "Match"
  }]
});


let Tournament = mongoose.model("Tournament", schema);
module.exports = Tournament;
