const AbstractRepository = require("./AbstractRepository");
const { AboutTranslations } = require("../models");

class AboutTranslationRepository extends AbstractRepository {
  get model() {
    return AboutTranslations;
  }
}

module.exports = AboutTranslationRepository;
