const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middleware/isLoggedIn");

module.exports = (di) => {
  const usersController = di.get("controller.users");

  router.get("/users", [isLoggedIn], (...args) => usersController.getAllUsers(...args));

  return router;
};
