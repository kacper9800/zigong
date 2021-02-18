const { body } = require("express-validator");
const { Language } = require("../models");

const update = [];

const create = [
  body(["name"])
    .trim()
    .not()
    .isEmpty()
    .withMessage("should be not empty")
    .bail()
    .custom(async (name, { req }) => {
      const language = await Language.findOne({
        where: {
          name,
        },
      });

      if (language) {
        return Promise.reject("Language already exists!");
      }

      req.language = language;
    }),

  body(["code"])
    .trim()
    .not()
    .isEmpty()
    .withMessage("should be not empty")
    .bail()
    .custom(async (code, { req }) => {
      const language = await Language.findOne({
        where: {
          code,
        },
      });

      if (language) {
        return Promise.reject("Language already exists!");
      }

      req.language = language;
    }),
];

module.exports = {
  update,
  create,
};
