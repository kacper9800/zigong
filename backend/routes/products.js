const express = require("express");
const router = express.Router();
const { isLoggedIn, isAdmin, validate } = require("../middleware");
const productValidator = require("../validators/productValidator");

module.exports = (di) => {
  const productController = di.get("controller.product");

  router.get("/products", (...args) => productController.index(...args));

  router.get("/products/:slug", (...args) =>
    productController.showBySlug(...args)
  );

  router.get("/products/id/:id", (...args) => productController.show(...args));

  router.post(
    "/products",
    [isLoggedIn, isAdmin, productValidator.create, validate],
    (...args) => productController.create(...args)
  );

  // @todo - update method

  router.delete("/products/:id", [isLoggedIn, isAdmin], (...args) =>
    productController.delete(...args)
  );

  return router;
};
