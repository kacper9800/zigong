const AbstractRepository = require("./AbstractRepository");
const { ContentTranslation } = require("../models");

class ContentTranslationRepository extends AbstractRepository {
  get model() {
    return ContentTranslation;
  }
}

module.exports = ContentTranslationRepository;
