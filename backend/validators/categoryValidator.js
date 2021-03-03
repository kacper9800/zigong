const { body } = require("express-validator");
const { Op } = require("sequelize");
const { Language, Category } = require("../models");

const update = [
  body(["lng"])
    .trim()
    .not()
    .isEmpty()
    .withMessage("should be not empty")
    .bail()
    .custom(async (lng, { req }) => {
      const language = await Language.findOne({
        where: {
          [Op.or]: [{ code: lng }, { name: lng }, { id: lng }],
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

  body(["homePageDescription"])
    .trim()
    .not()
    .isEmpty()
    .withMessage("should be not empty")
    .bail(),

  body(["name"])
    .trim()
    .not()
    .isEmpty()
    .withMessage("should be not empty")
    .bail(),
];

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

  body(["categoryId"]).custom(async (categoryId, { req }) => {
    let lng = req.body.lng;

    if (!lng) {
      lng = Language.DEFAULT;
    }

    const language = await Language.findOne({
      where: {
        [Op.or]: [{ code: lng }, { name: lng }],
      },
    });

    if (language.code !== Language.DEFAULT && !categoryId) {
      return Promise.reject("categoryId is required!");
    }

    const category = await Category.findOne({
      where: {
        id: categoryId,
      },
    });

    if (language.code !== Language.DEFAULT && !category) {
      return Promise.reject("categoryId does not exists!");
    }
  }),
];

module.exports = {
  update,
  create,
};
