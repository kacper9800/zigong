const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const di = require("./di");

app.set("di", di);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.use(express.static("./public"));

const server = require("http").createServer(app);

const routes = require("./routes")(di, app);

app.use(routes);

module.exports = server;
