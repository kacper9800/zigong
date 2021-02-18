const { body, check } = require("express-validator");

const update = [
  body(["name"])
    .trim()
    .not()
    .isEmpty()
    .withMessage("should be not empty")
    .bail(),

  body(["description"])
    .trim()
    .not()
    .isEmpty()
    .withMessage("should be not empty")
    .bail(),
];

const create = [];

module.exports = {
  update,
  create,
};
