const express = require("express");
const router = express.Router();
const { isLoggedIn, isAdmin, validate } = require("../middleware");
const aboutValidator = require("../validators/aboutValidator");

module.exports = (di) => {
  const AboutController = di.get("controller.about");

  router.get("/about", (...args) => AboutController.index(...args));

  router.get("/about/id/:id", [isLoggedIn, isAdmin], (...args) =>
    AboutController.show(...args)
  );

  router.get("/about/:slug", (...args) => AboutController.showBySlug(...args));

  router.post("/about", [isLoggedIn, isAdmin, aboutValidator.create, validate],
    (...args) => AboutController.create(...args)
  );

  router.put("/about", [isLoggedIn, isAdmin, aboutValidator.update, validate],
    (...args) => AboutController.update(...args)
  );

  router.delete("/abouts/:id", [isLoggedIn, isAdmin], (...args) =>
    AboutController.delete(...args)
  );

  return router;
};
