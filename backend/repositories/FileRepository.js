const AbstractRepository = require("./AbstractRepository");
const { File } = require("../models");

class FileRepository extends AbstractRepository {
  get model() {
    return File;
  }
}

module.exports = FileRepository;
