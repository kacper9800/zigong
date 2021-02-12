const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const config = require("./config");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

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

const routes = require("./routes")(di);

app.use(routes);

module.exports = server;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Zigong Application - Express API with Swagger",
      version: "0.1.0",
      description:
        "Zigong application. Created by M & K",
      // license: {
      //   name: "MIT",
      //   url: "https://spdx.org/licenses/MIT.html",
      // },
      // contact: {
      //   name: "LogRocket",
      //   url: "https://logrocket.com",
      //   email: "info@email.com",
      // },
    },
    servers: [
      {
        url: "http://localhost:3004/api-docs",
      },
    ],
  },
  apis: ["./routes/users.js"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);
