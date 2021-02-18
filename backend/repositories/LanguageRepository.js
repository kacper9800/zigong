const AbstractRepository = require("./AbstractRepository");
const { Language } = require("../models");

class LanguageRepository extends AbstractRepository {
  get model() {
    return Language;
  }

  async findLanguageId(lng) {
    const where = {};

    if (!lng) {
      where.code = Language.DEFAULT;
    } else {
      where.code = lng;
    }

    const language = await Language.findOne({ where });

    if (!language) {
      return false;
    }

    return language.id;
  }
}

module.exports = LanguageRepository;
