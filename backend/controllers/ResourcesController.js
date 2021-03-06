const HttpStatuses = require("http-status-codes");
const { File } = require("../models");

class ResourceController {
  constructor(
    resourceRepository,
    categoryRepository,
    categoryTranslationRepository,
    languageRepository
  ) {
    this.resourceRepository = resourceRepository;
    this.categoryRepository = categoryRepository;
    this.categoryTranslationRepository = categoryTranslationRepository;
    this.languageRepository = languageRepository;
  }

  async index(req, res) {
    const { lng } = req.query;
    const { perPage = 9, page = 1, sortBy = "id", order = "DESC" } = req.query;

    const pageNumber = parseInt(page);
    const limit = parseInt(perPage);
    const offset = (pageNumber - 1) * limit;

    const languageId = await this.languageRepository.findLanguageId(lng);

    if (!languageId) {
      return res.sendStatus(HttpStatuses.NOT_FOUND);
    }

    const resources = await this.categoryRepository.findAndCountAll({
      offset,
      limit,
      order: [[sortBy, order]],
      where: {},
      attributes: {
        exclude: ["coverImageId", "homePageCoverImageId"],
      },
      include: [
        {
          association: "resource",
          where: { languageId },
          attributes: {
            exclude: ["categoryId", "languageId", "file"],
          },
          include: [
            {
              model: File,
              as: "pdf",
            },
          ],
        },
        {
          association: "categoryTranslation",
          where: { languageId },
          attributes: {
            exclude: [
              "id",
              "categoryId",
              "languageId",
              "homePageDescription",
              "description",
            ],
          },
        },
      ],
    });

    const { count } = resources;

    const totalPages = Math.ceil(count / limit);

    return res.send({ count, totalPages, data: resources.rows });
  }
}

module.exports = ResourceController;
