const express = require("express");
const router = express.Router();
const { isLoggedIn, isAdmin, validate } = require("../middleware");
const aboutValidator = require("../validators/aboutValidator");

module.exports = (di) => {
  const AboutController = di.get("controller.about");

  router.get("/abouts", (...args) => AboutController.index(...args));

  router.get("/abouts/id/:id", [isLoggedIn, isAdmin], (...args) =>
    AboutController.show(...args)
  );

  router.get("/abouts/:slug", (...args) => AboutController.showBySlug(...args));

  router.post(
    "/abouts",
    [isLoggedIn, isAdmin, aboutValidator.create, validate],
    (...args) => AboutController.create(...args)
  );

  router.put(
    "/abouts",
    [isLoggedIn, isAdmin, aboutValidator.update, validate],
    (...args) => AboutController.update(...args)
  );

  router.delete("/abouts/:id", [isLoggedIn, isAdmin], (...args) =>
    AboutController.delete(...args)
  );

  return router;
};
