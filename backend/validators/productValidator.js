const { body } = require("express-validator");
const { Op } = require("sequelize");
const { Language, Category, Product, File } = require("../models");

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

  body(["coverImageId"])
    .trim()
    .not()
    .isEmpty()
    .withMessage("should be not empty")
    .bail()
    .custom(async (coverImageId, { req }) => {
      const file = await File.findOne({ where: { id: coverImageId } });

      if (!file) {
        return Promise.reject("File does not exists!");
      }
    }),

  body(["file"])
    .trim()
    .not()
    .isEmpty()
    .withMessage("resources PDF should be not empty!")
    .bail()
    .custom(async (file, { req }) => {
      const pdf = await File.findOne({ where: { id: file } });

      if (!pdf || pdf.mimetype !== "pdf") {
        return Promise.reject("File does not exists!");
      }
    }),

  body(["value"])
    .trim()
    .not()
    .isEmpty()
    .withMessage("should be not empty")
    .bail()
    .custom(async (value, { req }) => {
      try {
        JSON.parse(value);
      } catch (e) {
        return Promise.reject("incorrect JSON");
      }
    }),

  body(["categoryId"])
    .trim()
    .not()
    .isEmpty()
    .withMessage("should be not empty")
    .bail()
    .custom(async (categoryId, { req }) => {
      const category = await Category.findOne({
        where: { id: categoryId },
      });

      if (!category) {
        return Promise.reject("category does not exists!");
      }
    }),

  body(["productId"]).custom(async (productId, { req }) => {
    let lng = req.body.lng;

    if (!lng) {
      lng = Language.DEFAULT;
    }

    const language = await Language.findOne({
      where: {
        [Op.or]: [{ code: lng }, { name: lng }],
      },
    });

    if (language.code !== Language.DEFAULT && !productId) {
      return Promise.reject("productId is required!");
    }

    const product = await Product.findOne({
      where: {
        id: productId,
      },
    });

    if (language.code !== Language.DEFAULT && !product) {
      return Promise.reject("productId does not exists!");
    }
  }),
];

module.exports = {
  update,
  create,
};
