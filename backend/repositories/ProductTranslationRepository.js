const AbstractRepository = require("./AbstractRepository");
const { ProductsTranslation } = require("../models");
const TranslatorHandler = require("../services/TranslatorHandler");
const { Language, Resource } = require("../models");

class ProductTranslationRepository extends AbstractRepository {
  get model() {
    return ProductsTranslation;
  }

  async translateAndCreate(product, fromLanguageId) {
    const translator = new TranslatorHandler();

    const languages = Language.findAll();

    return languages.map(async (e) => {
      if (e.id !== fromLanguageId) {
        const name = await translator.handle(
          product.name,
          fromLanguageId,
          e.id
        );

        product.name = name;
        product.languageId = e.id;

        const createdTranslation = await ProductsTranslation.create(product);

        await Resource.create(product);

        return createdTranslation;
      }
    });
  }
}

module.exports = ProductTranslationRepository;
