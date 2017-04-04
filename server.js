let express = require("express");
let bodyParser = require("body-parser");
let mongodb = require("mongodb");
let mongoose = require("mongoose");
let app = express();

app.use(bodyParser.json());

// Create link to Angular build directory
const ANGULAR_DIR = __dirname + "/dist/";
app.use(express.static(ANGULAR_DIR));

// Constants
const API_URI = "/api";
const TOURNAMENTS_URI = "/api/tournaments";
const TOURNAMENT_URI = `${TOURNAMENTS_URI}/:id`;
const PLAYERS_URI = "/api/players";
const PLAYER_URI = `${PLAYERS_URI}/:id`;
const MATCHES_URI = "/api/matches";
const MATCH_URI = `${MATCHES_URI}/:id`;

let tournamentRoutes = require("./")
let Tournament = require("./tournaments/models/tournament");
let Player = require("./tournaments/models/player");
let Match = require("./tournaments/models/match");
let Methods = require("./tournaments/methods");

mongoose.Promise = Promise; // Use JS Promise so that mongoose doesn't complain
mongoose.connect(process.env.MONGODB_URI || process.env.MONGODB_URI_LOCAL);

let db = mongoose.connection;

db.on("error", (err) => {
  console.error(err);
  process.exit(1);
});

// Initialize the app upon database connection
db.once("open", () => {
  console.log("Database connection ready");


  let server = app.listen(process.env.PORT || 8080, () => {
    let port = server.address().port;

    console.log("App is now running on port", port);
  });
});

app 

// Pass routing to Angular
app.use("/*", (req, res) => {
  res.sendFile(`${ANGULAR_DIR}/index.html`);
});