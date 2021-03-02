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
    const {
      perPage = 9,
      page = 1,
      sortBy = "createdAt",
      order = "ASC",
    } = req.query;

    const pageNumber = parseInt(page);
    const limit = parseInt(perPage);
    const offset = (pageNumber - 1) * limit;

    const languageId = await this.languageRepository.findLanguageId(lng);

    if (!languageId) {
      return res.sendStatus(HttpStatuses.NOT_FOUND);
    }

    const category = await this.categoryRepository.findAndCountAll({
      offset,
      limit,
      // order: [[sortBy, order]],
      where: {},
      attributes: {
        exclude: ["coverImageId", "homePageCoverImageId"],
      },
      include: [
        {
          association: "resource",
          where: { languageId },
          attributes: {
            exclude: ["id", "categoryId", "languageId", "file"],
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

    // const category = await this.categoryTranslationRepository.findAndCountAll({
    //   offset,
    //   limit,
    //   order: [[sortBy, order]],
    //   where: { languageId },
    //   attributes: {
    //     exclude: ["id", "languageId", "description", "homePageDescription"],
    //   },
    //   include: [
    //     {
    //       association: "category",
    //       attributes: {
    //         exclude: ["id", "homePageCoverImageId", "coverImageId"],
    //       },
    //     },
    //     {
    //       association: "resource",
    //       where: {
    //         languageId,
    //       },
    //       attributes: {
    //         exclude: ["id", "file", "languageId", "categoryId"],
    //       },
    //       include: [{ model: File, as: "pdf" }],
    //     },
    //   ],
    // });

    const { count } = category;

    const totalPages = Math.ceil(count / limit);

    return res.send({ count, totalPages, data: category.rows });
  }
}

module.exports = ResourceController;
