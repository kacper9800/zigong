const HttpStatuses = require("http-status-codes");

class LanguageController {
  constructor(languageRepository) {
    this.languageRepository = languageRepository;
  }

  async index(req, res) {
    const {
      perPage = 5,
      page = 1,
      sortBy = "createdAt",
      order = "desc",
    } = req.query;

    const pageNumber = parseInt(page);
    const limit = parseInt(perPage);
    const offset = (pageNumber - 1) * limit;

    const where = {};

    const users = await this.languageRepository.findAndCountAll({
      offset,
      limit,
      where,
      order: [[sortBy, order]],
    });

    const { count } = users;

    const totalPages = Math.ceil(count / limit);

    return res.send({ count, totalPages, data: users.rows });
  }

  async show(req, res) {
    const { id } = req.params;

    const language = await this.languageRepository.findOne({ where: { id } });

    if (!language) {
      return res.sendStatus(HttpStatuses.NOT_FOUND);
    }

    return res.send(language);
  }

  async create(req, res) {
    const language = await this.languageRepository.create({ ...req.body });

    return res.status(HttpStatuses.CREATED).send(language);
  }

  // @todo update method
}

module.exports = LanguageController;
