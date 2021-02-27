const UserRepository = require("../repositories/UserRepository");
const RoleRepository = require("../repositories/RoleRepository");
const RecoverPasswordRepository = require("../repositories/RecoverPasswordRepository");
const RefreshTokenRepository = require("../repositories/RefreshTokenRepository");
const LanguageRepository = require("../repositories/LanguageRepository");
const FileRepository = require("../repositories/FileRepository");
const CategoryRepository = require("../repositories/CategoryRepository");
const CategoryTranslationRepository = require("../repositories/CategoryTranslationRepository");
const ContentRepository = require("../repositories/ContentRepository");
const ContentTranslationRepository = require("../repositories/ContentTranslationRepository");
const ProductRepository = require("../repositories/ProductRepository");
const ProductTranslationRepository = require("../repositories/ProductTranslationRepository");

module.exports = (container) => {
  container.register("repositories.user", UserRepository);

  container.register("repositories.recoverPassword", RecoverPasswordRepository);

  container.register("repositories.role", RoleRepository);

  container.register("repositories.refreshToken", RefreshTokenRepository);

  container.register("repositories.language", LanguageRepository);

  container.register("repositories.file", FileRepository);

  container.register("repositories.category", CategoryRepository);

  container.register(
    "repositories.categoryTranslation",
    CategoryTranslationRepository
  );

  container.register("repositories.content", ContentRepository);

  container.register(
    "repositories.contentTranslation",
    ContentTranslationRepository
  );

  container.register("repositories.product", ProductRepository);

  container.register(
    "repositories.productTranslation",
    ProductTranslationRepository
  );
};
