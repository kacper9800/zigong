const { body } = require("express-validator");

module.exports = [
  body(["firstAndLastName"])
    .trim()
    .not()
    .isEmpty()
    .withMessage("should be not empty")
    .bail(),

  body(["email"])
    .trim()
    .not()
    .isEmpty()
    .withMessage("should be not empty")
    .bail(),

  body(["topic"])
    .trim()
    .not()
    .isEmpty()
    .withMessage("should be not empty")
    .bail(),

  body(["phone"])
    .trim()
    .not()
    .isEmpty()
    .withMessage("should be not empty")
    .bail(),

  body(["message"])
    .trim()
    .not()
    .isEmpty()
    .withMessage("should be not empty")
    .bail(),
];
