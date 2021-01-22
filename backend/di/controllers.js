const { Reference } = require("node-dependency-injection");
const AuthController = require("../controllers/AuthController");
const UsersController = require("../controllers/UsersController");

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
};
