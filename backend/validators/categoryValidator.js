const { body } = require("express-validator");
const { Op } = require("sequelize");
const { Language } = require("../models");

const update = [];

const create = [
  body(["name"])
    .trim()
    .not()
    .isEmpty()
    .withMessage("should be not empty")
    .bail(),

  body(["lng"]).custom(async (lng, { req }) => {
    if (!lng) {
      lng = Language.DEFAULT;
    }

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

  body(["homePageDescription"])
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

module.exports = {
  update,
  create,
};
