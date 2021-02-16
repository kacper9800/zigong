const express = require("express");
const router = express.Router();
const { isLoggedIn, isAdmin, validate } = require("../middleware");
const languageValidator = require("../validators/languageValidator");

module.exports = (di) => {
  const languageController = di.get("controller.languages");

  router.get("/languages", (...args) => languageController.index(...args));

  router.get("/languages/:id", (...args) => languageController.show(...args));

  router.post(
    "/languages",
    [isLoggedIn, isAdmin, languageValidator.create, validate],
    (...args) => languageController.create(...args)
  );

  router.delete("/languages", [isLoggedIn, isAdmin], (...args) =>
    languageController.delete(...args)
  );

  //   @todo PUT

  return router;
};
