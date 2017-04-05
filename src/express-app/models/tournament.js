let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

if (!mongoose.Tournament) {
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

  mongoose.Tournament = mongoose.model("Tournament", schema);  
}

export default mongoose.Tournament;
