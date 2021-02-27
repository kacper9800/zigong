const AbstractRepository = require("./AbstractRepository");
const { About } = require("../models");

class AboutRepository extends AbstractRepository {
  get model() {
    return About;
  }
}

module.exports = AboutRepository;
