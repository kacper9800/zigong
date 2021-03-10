const { body } = require("express-validator");
const { Op } = require("sequelize");
const { Language } = require("../models");

const update = [
  body(["value"])
    .trim()
    .not()
    .isEmpty()
    .withMessage("should be not empty")
    .bail()
    .custom(async (value, { req }) => {
      try {
        JSON.stringify(value);
      } catch (error) {
        return Promise.reject("Invalid JSON");
      }
    }),

  body(["lng"])
    .trim()
    .not()
    .isEmpty()
    .withMessage("should be not empty")
    .bail()
    .custom(async (lng, { req }) => {
      const language = await Language.findOne({
        where: {
          [Op.or]: [{ code: lng }, { name: lng }],
        },
      });

      if (!language) {
        return Promise.reject("Language does not exists!");
      }

      req.language = language;
    }),
];

const create = [];

module.exports = {
  update,
  create,
};
