// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();
require("dotenv").config();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api", function (req, res) {
    const date = new Date();
    res.json({
        unix: date.valueOf(),
        utc: date.toUTCString(),
    });
});
app.get("/api/:date", function (req, res) {
    const { date } = req.params;
    const dateFormat = date.split("");
    let convertDate;

    if (dateFormat.includes("-")) {
        convertDate = new Date(req.params.date);
    }
    convertDate = new Date(parseInt(req.params.date));
    if (convertDate === null) {
        res.json({
            error: "Invalid Date",
        });
    }
    res.json({
        unix: convertDate.valueOf(),
        utc: convertDate.toUTCString(),
    });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
    console.log("Your app is listening on port " + listener.address().port);
});
