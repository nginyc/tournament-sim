let mongoose = require("mongoose");
let Schema = mongoose.Schema;

if (!mongoose.Player) {
  let schema = new Schema({
    name: String
  });
    
  mongoose.Player = mongoose.model("Player", schema);
}

export default mongoose.Player;