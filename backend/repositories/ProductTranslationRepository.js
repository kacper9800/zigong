const AbstractRepository = require("./AbstractRepository");
const { ProductsTranslation } = require("../models");

class ProductTranslationRepository extends AbstractRepository {
  get model() {
    return ProductsTranslation;
  }
}

module.exports = ProductTranslationRepository;
