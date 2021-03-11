const express = require("express");
const Sentry = require("@sentry/node");
const config = require("./config");
const app = express();

if (config.sentry.dsn) {
  Sentry.init({ dsn: config.sentry.dsn });
  app.use(Sentry.Handlers.requestHandler());
}

const di = require("./di");

app.set("di", di);

require("./plugins/bodyParser")(app);

require("./plugins/cors")(app);

app.use(express.static("./public"));

const server = require("http").createServer(app);

const routes = require("./routes")(di, app);

app.use(routes);

app.use(Sentry.Handlers.errorHandler());

module.exports = server;
