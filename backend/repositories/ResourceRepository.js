const AbstractRepository = require("./AbstractRepository");
const { Resource } = require("../models");

class ResourceRepository extends AbstractRepository {
  get model() {
    return Resource;
  }
}

module.exports = ResourceRepository;
