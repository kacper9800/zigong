const HttpStatuses = require("http-status-codes");
const config = require("../config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const moment = require("moment");

class AuthController {
  constructor(
    loginHandler,
    sendEmailToRecoverPasswordHandler,
    recoverPasswordRepository,
    refreshTokenRepository
  ) {
    this.loginHandler = loginHandler;
    this.sendEmailToRecoverPasswordHandler = sendEmailToRecoverPasswordHandler;
    this.recoverPasswordRepository = recoverPasswordRepository;
    this.refreshTokenRepository = refreshTokenRepository;
  }

  async login(req, res) {
    const hash = crypto.randomBytes(10).toString("hex");
    const { email, password } = req.body;
    const { refreshTokenExpiresIn, secretKey, expiresIn } = config.auth;

    const user = await this.loginHandler.handle(email, password);

    if (!user) {
      return res.sendStatus(HttpStatuses.UNAUTHORIZED);
    }

    const { id, email: userEmail } = user;

    const JWTtoken = jwt.sign({ id, userEmail }, secretKey, {
      expiresIn,
    });

    await this.refreshTokenRepository.create({
      userId: user.id,
      hash,
      expireIn: moment().add(refreshTokenExpiresIn, "ms"),
    });

    const refreshToken = jwt.sign({ hash }, secretKey, {
      expiresIn: refreshTokenExpiresIn,
    });

    return res.send({
      token: JWTtoken,
      expiresIn,
      refreshToken,
      refreshTokenExpiresIn,
      user,
    });
  }

  async refreshToken(req, res) {
    const hash = crypto.randomBytes(10).toString("hex");
    const { refreshTokenExpiresIn, secretKey, expiresIn } = config.auth;
    const { user } = req.refreshToken;
    const recover = req.refreshToken;

    const { id, email: userEmail } = user;

    const JWTtoken = jwt.sign({ id, userEmail }, secretKey, {
      expiresIn,
    });

    await this.refreshTokenRepository.create({
      userId: user.id,
      hash,
      expireIn: moment().add(refreshTokenExpiresIn, "ms"),
    });

    const refreshToken = jwt.sign({ hash }, secretKey, {
      expiresIn: refreshTokenExpiresIn,
    });

    await recover.destroy();

    return res.send({
      token: JWTtoken,
      expiresIn,
      refreshToken,
      refreshTokenExpiresIn,
      user,
    });
  }

  async me(req, res) {
    const user = req.loggedUser;

    return res.send({ user });
  }

  async recoverPasswordSendMail(req, res) {
    const hash = crypto.randomBytes(5).toString("hex");

    const { user } = req;
    const { expiresIn } = config.password;

    this.recoverPasswordRepository.create({
      userId: user.id,
      hash,
      expireIn: moment().add(expiresIn, "ms"),
    });

    this.sendEmailToRecoverPasswordHandler.handle(user, hash);

    return res.sendStatus(HttpStatuses.NO_CONTENT);
  }

  async recoverPassword(req, res) {
    const { user } = req.recoverPassword;
    const recover = req.recoverPassword;
    const { password } = req.body;

    await user.update({
      password: bcrypt.hashSync(password, 12),
    });

    await recover.destroy();

    return res.sendStatus(HttpStatuses.NO_CONTENT);
  }
}

module.exports = AuthController;
