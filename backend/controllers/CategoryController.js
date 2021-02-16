const HttpStatuses = require("http-status-codes");
const { Op } = require("sequelize");
const { Language, File } = require("../models");
const slugGenerator = require("../helpers/slug");

class CategoryController {
  constructor(categoryRepository, categoryTranslationRepository) {
    this.categoryRepository = categoryRepository;
    this.categoryTranslationRepository = categoryTranslationRepository;
  }

  // @todo - find and fix bugs

  async index(req, res) {
    const { lng } = req.query;

    const where = {};

    if (!lng) {
      where.code = Language.DEFAULT;
    } else {
      where.code = lng;
    }

    const language = await Language.findOne({ where });

    if (!language) {
      return res.sendStatus(HttpStatuses.NOT_FOUND);
    }

    const { id: languageId } = language;

    const category = await this.categoryTranslationRepository.findAll({
      where: { languageId },
      attributes: {
        exclude: ["id", "languageId"],
      },
      include: [
        {
          association: "category",
          attributes: {
            exclude: ["homePageCoverImageId", "coverImageId"],
          },
          include: [{ model: File, as: "coverImage" }],
          include: [{ model: File, as: "homePageCoverImage" }],
        },
      ],
    });

    return res.send(category);
  }

  async show(req, res) {
    const { id } = req.params;
    const { lng } = req.query;

    const where = {};

    if (!lng) {
      where.code = Language.DEFAULT;
    } else {
      where.code = lng;
    }

    const language = await Language.findOne({ where });

    if (!language) {
      return res.sendStatus(HttpStatuses.NOT_FOUND);
    }

    const { id: languageId } = language;

    const categoryTranslation = await this.categoryTranslationRepository.findOne(
      {
        where: { languageId, categoryId: id },
        attributes: {
          exclude: ["id", "languageId"],
        },
        include: [
          {
            association: "language",
            attributes: {
              exclude: ["id"],
            },
          },
        ],
      }
    );

    if (!categoryTranslation) {
      return res.sendStatus(HttpStatuses.NOT_FOUND);
    }

    return res.send(categoryTranslation);
  }

  async showBySlug(req, res) {
    const { slug } = req.params;
    const { lng } = req.query;

    const where = {};

    if (!lng) {
      where.code = Language.DEFAULT;
    } else {
      where.code = lng;
    }

    const language = await Language.findOne({ where });

    if (!language) {
      return res.sendStatus(HttpStatuses.NOT_FOUND);
    }

    const { id: languageId } = language;

    const category = await this.categoryRepository.findOne({
      where: { slug },
    });

    if (!category) {
      return res.sendStatus(HttpStatuses.NOT_FOUND);
    }

    const { id: categoryId } = category;

    const categoryTranslation = await this.categoryTranslationRepository.findOne(
      {
        where: { languageId, categoryId },
        attributes: {
          exclude: ["id"],
        },
      }
    );

    if (!categoryTranslation) {
      return res.sendStatus(HttpStatuses.NOT_FOUND);
    }

    return res.send(categoryTranslation);
  }

  async create(req, res) {
    const {
      categoryId,
      name,
      homePageDescription,
      description,
      homePageCoverImageId,
    } = req.body;
    const { id: languageId } = req.language;

    const slug = slugGenerator(name);

    let existCategory = await this.categoryRepository.findOne({
      where: { [Op.or]: [{ slug }, { id: categoryId }] },
    });

    if (!existCategory) {
      existCategory = await this.categoryRepository.create({
        slug,
        id: categoryId,
        homePageCoverImageId,
      });
    }

    const categoryTranslation = await this.categoryTranslationRepository.findOne(
      {
        where: { languageId, categoryId: existCategory.id },
      }
    );

    if (!categoryTranslation) {
      const category = await this.categoryTranslationRepository.create({
        categoryId: existCategory.id,
        name,
        homePageDescription,
        description,
        languageId,
      });

      return res.send(category);
    } else {
      return res.sendStatus(HttpStatuses.NOT_ACCEPTABLE);
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    await this.categoryTranslationRepository.delete({
      where: { categoryId: id },
    });

    return res.sendStatus(HttpStatuses.NO_CONTENT);
  }
}

module.exports = CategoryController;
