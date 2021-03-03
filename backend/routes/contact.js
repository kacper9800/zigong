const express = require("express");
const router = express.Router();
const { validate } = require("../middleware");
const contactValidator = require("../validators/contactValidator");

module.exports = (di) => {
  const ContactController = di.get("controller.contact");

  router.post("/contact", [contactValidator, validate], (...args) =>
    ContactController.sendEmail(...args)
  );

  return router;
};
