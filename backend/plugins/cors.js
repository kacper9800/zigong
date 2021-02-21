const cors = require("cors");
const config = require("../config");

module.exports = (app) => {
  const corsSites = config.app.corsSites.split(",").map((site) => site.trim());
  const originsWhitelist = [
    "http://localhost:8080",
    config.app.frontendUrl,
    config.app.appUrl,
    ...corsSites,
  ];

  const corsOptions = {
    origin(origin, callback) {
      console.log(origin);

      callback(null, true);
    },
    credentials: true,
  };

  app.use(cors(corsOptions));
};
