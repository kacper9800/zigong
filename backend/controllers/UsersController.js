const HttpStatuses = require("http-status-codes");
const { Role } = require("../models");
const bcrypt = require("bcryptjs");

class UsersController {
  constructor(userRepository, roleRepository) {
    this.userRepository = userRepository;
    this.roleRepository = roleRepository;
  }

  async index(req, res) {
    const {
      perPage = 5,
      page = 1,
      sortBy = "createdAt",
      order = "desc",
    } = req.query;

    const limit = perPage;
    const offset = (page - 1) * limit;

    const where = {};

    const users = await this.userRepository.findAndCountAll({
      offset,
      limit,
      where,
      order: [[sortBy, order]],
    });

    const { count } = users;

    const totalPages = Math.ceil(count / limit);

    return res.send({ count, totalPages, data: users.rows });
  }

  async show(req, res) {
    const { id } = req.params;
    const { isAdmin, loggedUser } = req;
    if (!isAdmin && loggedUser.id != id) {
      return res.sendStatus(HttpStatuses.FORBIDDEN);
    }
    const user = await this.userRepository.get(id);
    if (!user) {
      return res.sendStatus(HttpStatuses.NOT_FOUND);
    }

    return res.send(user);
  }

  async create(req, res) {
    const { password } = req.body;

    req.body.password = bcrypt.hashSync(password, 12);

    const user = await this.userRepository.create({ ...req.body });

    const userRole = await this.roleRepository.findOne({
      where: {
        name: Role.USER,
      },
    });

    await user.setRoles([userRole]);

    const userCreated = await this.userRepository.get(user.id);

    return res.status(HttpStatuses.CREATED).send(userCreated);
  }

  async update(req, res) {
    const { id } = req.params;
    const { isAdmin, loggedUser } = req;

    if (!loggedUser) {
      return res.sendStatus(HttpStatuses.UNAUTHORIZED);
    }

    if (!isAdmin && loggedUser.id != id) {
      return res.sendStatus(HttpStatuses.FORBIDDEN);
    }

    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      return res.sendStatus(HttpStatuses.NOT_FOUND);
    }

    req.body.password = bcrypt.hashSync(req.body.password, 12);

    await user.update(req.body);

    const userUpdated = await this.userRepository.get(user.id);

    return res.send(userUpdated);
  }

  async delete(req, res) {
    const { id } = req.params;
    const { loggedUser } = req;

    if (id == loggedUser.id) {
      return res.sendStatus(HttpStatuses.NO_CONTENT);
    }

    const user = await this.userRepository.findById(id);

    if (!user) {
      return res.sendStatus(HttpStatuses.NO_CONTENT);
    }

    await user.destroy();

    return res.sendStatus(HttpStatuses.NO_CONTENT);
  }
}

module.exports = UsersController;
