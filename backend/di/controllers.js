const { Reference } = require("node-dependency-injection");
const AuthController = require("../controllers/AuthController");
const UsersController = require("../controllers/UsersController");
const LabguageController = require("../controllers/LanguageController");
const FileController = require("../controllers/FileController");
const CategoryController = require("../controllers/CategoryController");
const ContentController = require("../controllers/ContentController");
const ProductController = require("../controllers/ProductController");
const AboutController = require("../controllers/AboutController");

module.exports = (container) => {
  container
    .register("controller.auth", AuthController)
    .addArgument(new Reference("services.loginHandler"))
    .addArgument(new Reference("services.sendEmailToRecoverPasswordHandler"))
    .addArgument(new Reference("repositories.recoverPassword"))
    .addArgument(new Reference("repositories.refreshToken"));

  container
    .register("controller.users", UsersController)
    .addArgument(new Reference("repositories.user"))
    .addArgument(new Reference("repositories.role"));

  container
    .register("controller.languages", LabguageController)
    .addArgument(new Reference("repositories.language"));

  container
    .register("controller.file", FileController)
    .addArgument(new Reference("repositories.file"));

  container
    .register("controller.category", CategoryController)
    .addArgument(new Reference("repositories.category"))
    .addArgument(new Reference("repositories.categoryTranslation"))
    .addArgument(new Reference("repositories.language"));

  container
    .register("controller.content", ContentController)
    .addArgument(new Reference("repositories.content"))
    .addArgument(new Reference("repositories.contentTranslation"))
    .addArgument(new Reference("repositories.language"));

  container
    .register("controller.product", ProductController)
    .addArgument(new Reference("repositories.product"))
    .addArgument(new Reference("repositories.productTranslation"));

  container
    .register("controller.about", AboutController)
    .addArgument(new Reference("repositories.about"))
    .addArgument(new Reference("repositories.aboutTranslation"))
    .addArgument(new Reference("repositories.language"));
};
