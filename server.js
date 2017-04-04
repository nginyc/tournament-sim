let config = require("./config.json");

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
const APP_PATH = "./src/express-app";
const APP_ROUTES_PATH = APP_PATH + "/routes";

let tournamentsRoutes = require(APP_ROUTES_PATH + "/tournaments");
let playersRoutes = require(APP_ROUTES_PATH + "/players");
let matchesRoutes = require(APP_ROUTES_PATH + "/matches");

mongoose.Promise = Promise; // Use JS Promise so that mongoose doesn't complain
mongoose.connect(process.env.MONGODB_URI || config["local_mongdb_uri"] || "mongodb://nginyc:nyc123@ds147900.mlab.com:47900/heroku_b8hnv1vd");

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
  res.sendFile(`${ANGULAR_DIR}/index.html`);
});
