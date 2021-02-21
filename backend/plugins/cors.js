const cors = require("cors");
const config = require("../config");

module.exports = (app) => {
  const corsSites = config.app.corsSites.split(",").map((site) => site.trim());
  const originsWhitelist = [
    "http://localhost:8080",
    config.app.frontendUrl,
    ...corsSites,
  ];

  const corsOptions = {
    origin(origin, callback) {
      callback(null, true);
    },
    credentials: true,
  };

  app.use(cors(corsOptions));
};
