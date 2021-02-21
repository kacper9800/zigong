const cors = require("cors");
const config = require("../config");

module.exports = (app) => {
  const corsSites = config.app.corsSites.split(",").map((site) => site.trim());
  const originsWhitelist = [
    "http://localhost:8080",
    config.app.frontendUrl,
    config.app.adminUrl,
    ...corsSites,
  ];

  const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  };

  app.use(cors(corsOptions));

  app.use(function (err, req, res, next) {
    if (err.message !== "Not allowed by CORS") return next();
    res.status(200).json({ code: 200, message: "Request not allowed by CORS" });
  });
};
