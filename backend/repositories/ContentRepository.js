const AbstractRepository = require("./AbstractRepository");
const { Content } = require("../models");

class ContentRepository extends AbstractRepository {
  get model() {
    return Content;
  }
}

module.exports = ContentRepository;
