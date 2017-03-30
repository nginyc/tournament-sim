let express = require("express");
let bodyParser = require("body-parser");
let mongodb = require("mongodb");
let app = express();

app.use(bodyParser.json());

// Create link to Angular build directory
let distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Mongo database, will be non-null upon connection
let db = null;

// Constants
const TOURNAMENTS_URI = "/api/tournaments";
const TOURNAMENT_URI = `${TOURNAMENTS_URI}/:id`;
const PLAYERS_URI = "/api/players";
const MATCHES_URI = "/api/matches";
const TOURNAMENTS_COLLECTION = "tournaments";
const PLAYERS_COLLECTION = "players";
const MATCHES_COLLECTION = "matches";

mongodb.MongoClient.connect(process.env.MONGODB_URI, (err, connectedDb) => {
  if (err) {
    console.error(err);
    process.exit(1);
    return;
  }

  db = connectedDb;
  console.log("Database connection ready");

  // Initialize the app
  let server = app.listen(process.env.PORT || 8080, () => {
    let port = server.address().port;

    console.log("App is now running on port", port);
  });
});


// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);

  res.status(code || 500)
    .json({
      "error": message
    });
}

/*
    Back-end for CRUD of Tournaments
*/

app.get(TOURNAMENTS_URI, (req, res) => {
  db.collection(TOURNAMENTS_COLLECTION)
    .find({})
    .toArray((err, docs) => {
      if (err) {
        handleError(res, err.message, "Failed to get all tournaments");
        return;
      }

      res.status(200)
        .json(docs);
    });
});

app.post(TOURNAMENTS_URI, (req, res) => {
  let tournament = req.body;

  db.collection(TOURNAMENTS_COLLECTION)
    .insertOne(tournament, (err, doc) => {
      if (err) {
        handleError(res, err.message, "Failed to add tournament");
        return;
      }

      res.status(201)
        .json(doc);
    });
});

app.get(TOURNAMENT_URI, (req, res) => {
  const _id = req.params.id;

  db.collection(TOURNAMENTS_COLLECTION)
    .findOne({ _id: _id }, (err, doc) => {
      if (err) {
        handleError(res, err.message, "Failed to get tournament");
        return;
      }

      res.status(200)
        .json(doc);
    });
});

app.delete(TOURNAMENT_URI, (req, res) => {
  const _id = req.params.id;

  db.collection(TOURNAMENTS_COLLECTION)
    .deleteOne({ _id: _id }, (err, doc) => {
      if (err) {
        handleError(res, err.message, "Failed to delete tournament");
        return;
      }

      res.status(200)
        .json(req.params.id)
    });
});