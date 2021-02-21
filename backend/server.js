const express = require("express");
const app = express();

const di = require("./di");

app.set("di", di);

require("./plugins/bodyParser")(app);

require("./plugins/cors")(app);

app.use(express.static("./public"));

const server = require("http").createServer(app);

const routes = require("./routes")(di, app);

app.use(routes);

module.exports = server;
