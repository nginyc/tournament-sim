let config = require("./config.json");

let express = require("express");
let bodyParser = require("body-parser");
let mongodb = require("mongodb");
let mongoose = require("mongoose");
let app = express();

const ANGULAR_APP_DIR = __dirname + "/dist/app";
const EXPRESS_APP_DIR = __dirname + "/dist/express-app";
const API_URI = "/api";
const APP_ROUTES_PATH = EXPRESS_APP_DIR + "/routes";

let tournamentsRoutes = require(APP_ROUTES_PATH + "/tournaments");
let playersRoutes = require(APP_ROUTES_PATH + "/players");
let matchesRoutes = require(APP_ROUTES_PATH + "/matches");

app.use(bodyParser.json());
app.use(express.static(ANGULAR_APP_DIR));

mongoose.Promise = Promise; // Use JS Promise so that mongoose doesn't complain
mongoose.connect(process.env.MONGODB_URI || config["local_mongdb_uri"]);

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

app.use(API_URI + "/tournaments", tournamentsRoutes);
app.use(API_URI + "/players", playersRoutes);
app.use(API_URI + "/matches", matchesRoutes);

// Pass routing to Angular
app.use("/*", (req, res) => {
  res.sendFile(`${ANGULAR_APP_DIR}/index.html`);
});
