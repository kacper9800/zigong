const UserRepository = require("../repositories/UserRepository");
const RoleRepository = require("../repositories/RoleRepository");
const RecoverPasswordRepository = require("../repositories/RecoverPasswordRepository");
const RefreshTokenRepository = require("../repositories/RefreshTokenRepository");

module.exports = (container) => {
  container.register("repositories.user", UserRepository);

  container.register("repositories.recoverPassword", RecoverPasswordRepository);

  container.register("repositories.role", RoleRepository);

  container.register("repositories.refreshToken", RefreshTokenRepository);
};
