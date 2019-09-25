const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const lowdbApi = require("./middlewares/lowdb-api");
const searchRouter = require("./routes/search");
const fs = require("fs");
const https = require("https");

const errorHandler = require("api-error-handler");

var privateKey = fs.readFileSync("./security/server.key");
var certificate = fs.readFileSync("./security/server.cert");

const app = express();
const port = 3020;

const file = path.join(__dirname, "./data/db.json");
const options = { prefix: "/api" };

app.use(bodyParser.json());

app.use("/api/search", searchRouter);
app.use(lowdbApi(file, options));

app.get("/", (req, res) => res.send("Welcome to Path Finder server."));

app.use(errorHandler());
https.createServer({ key: privateKey, cert: certificate }, app).listen(port);
