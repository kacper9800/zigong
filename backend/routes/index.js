const express = require("express");
const router = express.Router();
const fs = require("fs");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { swagger } = require("../config");

const options = {
  definition: swagger,
  apis: [],
};

module.exports = (di, app) => {
  fs.readdirSync(__dirname).forEach((route) => {
    route = route.split(".")[0];

    if (route === "index") {
      return;
    }

    options.apis.push(`./routes/${route}.js`);

    router.use(require(`./${route}`)(di));
  });

  const specs = swaggerJsdoc(options);

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

  return router;
};
