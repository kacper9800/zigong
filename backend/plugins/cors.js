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
      if (!origin || originsWhitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  };

  app.use(cors(corsOptions));
};
