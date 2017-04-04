let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let schema = new Schema({
  name: String
});

let Player = mongoose.model("Player", schema);
module.exports = Player;