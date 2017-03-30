let express = require("express");
let bodyParser = require("body-parser");
let mongodb = require("mongodb");

let app = express();
app.use(bodyParser.json());

// Mongo database, will be non-null upon connection
let db = null;

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

/*
    Back-end for CRUD of Tournaments
*/

const TOURNAMENTS_URI = "/api/tournaments";

app.get(TOURNAMENTS_URI, (req, res) => {

});