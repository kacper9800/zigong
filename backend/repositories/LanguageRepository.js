const AbstractRepository = require("./AbstractRepository");
const { Language } = require("../models");

class LanguageRepository extends AbstractRepository {
  get model() {
    return Language;
  }
}

module.exports = LanguageRepository;
