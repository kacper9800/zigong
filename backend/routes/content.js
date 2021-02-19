const express = require("express");
const router = express.Router();
const { isLoggedIn, isAdmin, validate } = require("../middleware");

module.exports = (di) => {
  const contentController = di.get("controller.content");

  router.get("/content", (...args) => contentController.index(...args));

  router.get("/content/:slug", (...args) => contentController.show(...args));

  router.put("/content/:slug", [isLoggedIn, isAdmin], (...args) =>
    contentController.update(...args)
  );

  return router;
};
