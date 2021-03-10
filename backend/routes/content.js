const express = require("express");
const router = express.Router();
const { isLoggedIn, isAdmin, validate } = require("../middleware");
const contentValidator = require("../validators/contentValidator");

module.exports = (di) => {
  const contentController = di.get("controller.content");

  router.get("/content/:slug", (...args) => contentController.show(...args));

  router.put(
    "/content/:slug",
    [isLoggedIn, isAdmin, contentValidator.update, validate],
    (...args) => contentController.update(...args)
  );

  return router;
};
