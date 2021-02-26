const { body } = require("express-validator");
const { Op } = require("sequelize");
const { Language, About } = require("../models");

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

  body(["description"])
  .trim()
  .not()
  .isEmpty()
  .withMessage("should be not empty")
  .bail(),

  body(["aboutId"]).custom(async (aboutId, { req }) => {
    let lng = req.body.lng;

    if (!lng) {
      lng = Language.DEFAULT;
    }

    const language = await Language.findOne({
      where: {
        [Op.or]: [{ code: lng }, { name: lng }],
      },
    });

    if (language.code !== Language.DEFAULT && !aboutId) {
      return Promise.reject("aboutId is required!");
    }

    const about = await About.findOne({
      where: {
        id: aboutId,
      },
    });

    if (language.code !== Language.DEFAULT && !about) {
      return Promise.reject("aboutId does not exists!");
    }
  }),
];

module.exports = {
  update,
  create,
};
