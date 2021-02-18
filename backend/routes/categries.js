const express = require("express");
const router = express.Router();
const { isLoggedIn, isAdmin, validate } = require("../middleware");
const categoryValidator = require("../validators/categoryValidator");

module.exports = (di) => {
  const CategoryController = di.get("controller.category");

  router.get("/categories", (...args) => CategoryController.index(...args));

  router.get("/categories/id/:id", [isLoggedIn, isAdmin], (...args) =>
    CategoryController.show(...args)
  );

  router.get("/categories/:slug", (...args) =>
    CategoryController.showBySlug(...args)
  );

  router.post(
    "/categories",
    [isLoggedIn, isAdmin, categoryValidator.create, validate],
    (...args) => CategoryController.create(...args)
  );

  //   @todo UPDATE(PUT) method

  router.delete("/categories/:id", [isLoggedIn, isAdmin], (...args) =>
    CategoryController.delete(...args)
  );

  return router;
};
