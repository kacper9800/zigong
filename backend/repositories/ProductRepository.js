const AbstractRepository = require("./AbstractRepository");
const { Product } = require("../models");

class ProductRepository extends AbstractRepository {
  get model() {
    return Product;
  }
}

module.exports = ProductRepository;
