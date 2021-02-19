const HttpStatuses = require("http-status-codes");
const { Op } = require("sequelize");
const { File } = require("../models");
const slugGenerator = require("../helpers/slug");

class CategoryController {
  constructor(
    categoryRepository,
    categoryTranslationRepository,
    languageRepository
  ) {
    this.categoryRepository = categoryRepository;
    this.categoryTranslationRepository = categoryTranslationRepository;
    this.languageRepository = languageRepository;
  }

  async index(req, res) {
    const { lng } = req.query;

    const languageId = await this.languageRepository.findLanguageId(lng);

    if (!languageId) {
      return res.sendStatus(HttpStatuses.NOT_FOUND);
    }

    const category = await this.categoryTranslationRepository.findAll({
      where: { languageId },
      attributes: {
        exclude: ["id", "languageId"],
      },
      include: [
        {
          association: "category",
          attributes: {
            exclude: ["id", "homePageCoverImageId", "coverImageId"],
          },
          include: [
            { model: File, as: "coverImage" },
            { model: File, as: "homePageCoverImage" },
          ],
        },
        {
          association: "language",
          attributes: {
            exclude: ["id"],
          },
        },
      ],
    });

    return res.send(category);
  }

  async show(req, res) {
    const { id } = req.params;
    const { lng } = req.query;

    const languageId = await this.languageRepository.findLanguageId(lng);

    if (!languageId) {
      return res.sendStatus(HttpStatuses.NOT_FOUND);
    }

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

    const languageId = await this.languageRepository.findLanguageId(lng);

    if (!languageId) {
      return res.sendStatus(HttpStatuses.NOT_FOUND);
    }

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

  async create(req, res) {
    const { categoryId, name } = req.body;
    const { id: languageId } = req.language;

    const slug = slugGenerator(name);

    let existCategory = await this.categoryRepository.findOne({
      where: { [Op.or]: [{ slug }, { id: categoryId }] },
    });

    if (!existCategory) {
      req.body.slug = slug;
      req.body.id = categoryId;

      existCategory = await this.categoryRepository.create({
        ...req.body,
      });
    }

    const categoryTranslation = await this.categoryTranslationRepository.findOne(
      {
        where: { languageId, categoryId: existCategory.id },
      }
    );

    req.body.categoryId = existCategory.id;
    req.body.languageId = languageId;

    if (!categoryTranslation) {
      const category = await this.categoryTranslationRepository.create({
        ...req.body,
      });

      return res.send(category);
    } else {
      return res.sendStatus(HttpStatuses.NOT_ACCEPTABLE);
    }
  }

  // @todo - update method

  async delete(req, res) {
    const { id } = req.params;

    await this.categoryTranslationRepository.delete({
      where: { categoryId: id },
    });

    return res.sendStatus(HttpStatuses.NO_CONTENT);
  }
}

module.exports = CategoryController;
