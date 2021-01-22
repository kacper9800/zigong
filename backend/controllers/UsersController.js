class UsersController {

  constructor(
    userRepository
  ) {
    this.userRepository = userRepository;
  }

  async getAllUsers(req, res) {
   const users = this.userRepository.getAll();
   return res.send({
      users: users});
  }
}

module.exports = UsersController;
