const HttpStatuses = require("http-status-codes");
const { File, Resource } = require("../models");

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

    const exclude = [
      "id",
      "categoryId",
      "languageId",
      "homePageDescription",
      "description",
      "languageId",
      "file",
      "coverImageId",
      "homePageCoverImageId",
      "deletedAt",
      "createdAt",
      "updatedAt",
    ];

    const resources = await this.categoryRepository.findAndCountAll({
      offset,
      limit,
      where: {},
      attributes: { exclude },
      include: [
        {
          association: "resource",
          where: { languageId },
          attributes: { exclude },
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
          attributes: { exclude },
        },
      ],
      order: [
        ["resource", sortBy, "ASC"],
        [sortBy, order],
      ],
    });

    const { count } = resources;

    const totalPages = Math.ceil(count / limit);

    return res.send({ count, totalPages, data: resources.rows });
  }
}

module.exports = ResourceController;
