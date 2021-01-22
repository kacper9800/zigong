const express = require("express");
const router = express.Router();
const {
  isLoggedIn,
  isAdmin,
  adminIsNotRequired,
  validate,
} = require("../middleware");
const usersValidator = require("../validators/usersValidator");

module.exports = (di) => {
  const usersController = di.get("controller.users");

  router.get("/users", [isLoggedIn, isAdmin], (...args) =>
    usersController.index(...args)
  );

  router.get("/users/:id", [isLoggedIn, adminIsNotRequired], (...args) =>
    usersController.show(...args)
  );

  router.post("/users", [usersValidator.create, validate], (...args) =>
    usersController.create(...args)
  );

  router.put(
    "/users/:id",
    [isLoggedIn, adminIsNotRequired, usersValidator.update, validate],
    (...args) => usersController.update(...args)
  );

  router.delete("/users/:id", [isLoggedIn, isAdmin], (...args) =>
    usersController.delete(...args)
  );

  return router;
};
