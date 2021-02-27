const HttpStatuses = require("http-status-codes");
const { Op } = require("sequelize");
const slugGenerator = require("../helpers/slug");

class AboutController {
  constructor(aboutRepository, aboutTranslationRepository, languageRepository) {
    this.aboutRepository = aboutRepository;
    this.aboutTranslationRepository = aboutTranslationRepository;
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

    const about = await this.aboutTranslationRepository.findAndCountAll({
      offset,
      limit,
      order: [[sortBy, order]],
      where: { languageId },
      attributes: {
        exclude: ["id", "languageId", "value", "deleted"],
      },
      include: [
        {
          association: "about",
          attributes: {
            exclude: ["id", "deleted"],
          },
        },
      ],
    });

    const { count } = about;

    const totalPages = Math.ceil(count / limit);

    return res.send({ count, totalPages, data: about.rows });
  }

  async show(req, res) {
    const { id } = req.params;
    const { lng } = req.query;

    const languageId = await this.languageRepository.findLanguageId(lng);

    if (!languageId) {
      return res.sendStatus(HttpStatuses.NOT_FOUND);
    }

    const aboutTranslation = await this.aboutTranslationRepository.findOne({
      where: { languageId, aboutId: id },
      attributes: {
        exclude: ["id", "languageId"],
      },
      include: [
        {
          association: "about",
          attributes: {
            exclude: ["id"],
          },
        },
      ],
    });

    if (!aboutTranslation) {
      return res.sendStatus(HttpStatuses.NOT_FOUND);
    }

    const parsedData = aboutTranslation.value;

    parsedData.name = aboutTranslation.name;

    return res.send(parsedData);
  }

  async showBySlug(req, res) {
    const { slug } = req.params;
    const { lng } = req.query;

    const languageId = await this.languageRepository.findLanguageId(lng);

    if (!languageId) {
      return res.sendStatus(HttpStatuses.NOT_FOUND);
    }

    const about = await this.aboutRepository.findOne({
      where: { slug },
    });

    if (!about) {
      return res.sendStatus(HttpStatuses.NOT_FOUND);
    }

    const { id: aboutId } = about;

    const aboutTranslation = await this.aboutTranslationRepository.findOne({
      where: { languageId, aboutId },
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
    });

    if (!aboutTranslation) {
      return res.sendStatus(HttpStatuses.NOT_FOUND);
    }

    const parsedData = aboutTranslation.value;
    parsedData.name = aboutTranslation.name;

    return res.send(parsedData);
  }

  async create(req, res) {
    const { aboutId, name } = req.body;
    const { id: languageId } = req.language;

    const slug = slugGenerator(name);

    let existAbout = await this.aboutRepository.findOne({
      where: { [Op.or]: [{ slug }, { id: aboutId }] },
    });

    if (!existAbout) {
      req.body.slug = slug;
      req.body.id = aboutId;

      existAbout = await this.aboutRepository.create({
        ...req.body,
      });
    }

    const aboutTranslation = await this.aboutTranslationRepository.findOne({
      where: { languageId, aboutId: existAbout.id },
    });

    req.body.aboutId = existAbout.id;
    req.body.languageId = languageId;

    if (!aboutTranslation) {
      const createdAbout = await this.aboutTranslationRepository.create({
        ...req.body,
      });

      return res.send(createdAbout);
    } else {
      return res.sendStatus(HttpStatuses.NOT_ACCEPTABLE);
    }
  }

  // @todo - update method
  async update(req, res) {
    const { id } = req.params;

    return res.sendStatus(HttpStatuses.NOT_MODIFIED);
  }

  async delete(req, res) {
    const { id } = req.params;

    await this.aboutTranslationRepository.delete({
      where: { aboutId: id },
    });

    return res.sendStatus(HttpStatuses.NO_CONTENT);
  }
}

module.exports = AboutController;
