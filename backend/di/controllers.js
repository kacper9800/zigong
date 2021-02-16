const { Reference } = require("node-dependency-injection");
const AuthController = require("../controllers/AuthController");
const UsersController = require("../controllers/UsersController");
const LabguageController = require("../controllers/LanguageController");
const FileController = require("../controllers/FileController");
const CategoryController = require("../controllers/CategoryController");

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
    .addArgument(new Reference("repositories.categoryTranslation"));
};
