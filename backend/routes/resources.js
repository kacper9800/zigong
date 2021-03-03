const express = require("express");
const router = express.Router();

module.exports = (di) => {
  const productController = di.get("controller.resource");

  router.get("/resources", (...args) => productController.index(...args));

  return router;
};
