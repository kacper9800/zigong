const AbstractRepository = require("./AbstractRepository");
const { CategoryTranslations } = require("../models");

class CategoryTranslationRepository extends AbstractRepository {
  get model() {
    return CategoryTranslations;
  }
}

module.exports = CategoryTranslationRepository;
