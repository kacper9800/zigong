const HttpStatuses = require("http-status-codes");
var fs = require("fs");
class FileController {
  constructor(fileRepository) {
    this.fileRepository = fileRepository;
  }

  async index(req, res) {
    const {
      perPage = 10,
      page = 1,
      sortBy = "createdAt",
      order = "desc",
      mimetype = "",
    } = req.query;

    const pageNumber = parseInt(page);
    const limit = parseInt(perPage);
    const offset = (pageNumber - 1) * limit;

    const where = {};

    if (mimetype) {
      where.mimetype = mimetype;
    }

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

  async create(req, res) {
    if (!req.files) {
      return res.status(400).send("filesInput is required");
    }

    var dir = "./public";

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
      fs.mkdirSync(dir + "/thumbnails");
      fs.mkdirSync(dir + "/s1440");
      fs.mkdirSync(dir + "/s720");
      fs.mkdirSync(dir + "/files");
    }

    const filesInput = req.files.filesInput;

    if (!filesInput) {
      return res.sendStatus(HttpStatuses.NOT_FOUND);
    }

    if (filesInput.name) {
      const uploadedFile = await this.fileRepository.uploadFile(filesInput);

      return res.send(uploadedFile);
    }

    const uploadedFiles = await Promise.all(
      filesInput.map(async (file) => {
        return await this.fileRepository.uploadFile(file);
      })
    );

    return res.send(uploadedFiles);
  }

  async update(req, res) {
    const { id } = req.params;

    const file = await this.fileRepository.findOne({ where: { id } });

    if (!file) {
      return res.sendStatus(HttpStatuses.NOT_FOUND);
    }

    file.update({ ...req.body });

    return res.send(file);
  }

  async delete(req, res) {
    const { id } = req.params;

    await this.fileRepository.destroy({ where: { id } });

    return res.sendStatus(HttpStatuses.NO_CONTENT);
  }
}

module.exports = FileController;
