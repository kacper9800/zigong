const HttpStatuses = require("http-status-codes");
const bcrypt = require("bcryptjs");

class FileController {
  constructor(fileRepository) {
    this.fileRepository = fileRepository;
  }

  async index(req, res) {
    const {
      perPage = 5,
      page = 1,
      sortBy = "createdAt",
      order = "desc",
    } = req.query;

    const limit = perPage;
    const offset = (page - 1) * limit;

    const where = {};

    const users = await this.fileRepository.findAndCountAll({
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

    const file = await this.fileRepository.findOne({ where: { id } });

    if (!file) {
      return res.sendStatus(HttpStatuses.NOT_FOUND);
    }

    return res.send(file);
  }

  //   @todo CREATE(POST) method
  async create(req, res) {
    // const { files } = req.files;

    const file = await this.fileRepository.create({
      name: "dddd",
      descriptin: "wrfregr",
      fileName: "wfowfhiew",
    });

    return res.send(file);
  }
  //   @todo UPDATE(PUT) method

  async delete(req, res) {
    const { id } = req.params;

    await this.fileRepository.destroy({ where: { id } });

    return res.sendStatus(HttpStatuses.NO_CONTENT);
  }
}

module.exports = FileController;
