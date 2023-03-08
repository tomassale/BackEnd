const userFactory = require("../daos/users/daoFactoryUser.js");

require("dotenv").config();

class UserService {
  constructor() {
    this.dao = userFactory(process.env.STORE);
  }

  async save(user) {
    let newUser = await this.dao.save(user);
    return newUser;
  }

  async getDocument(filter) {
    return await this.dao.getDocument(filter);
  }

  async getById(id) {
    return await this.dao.getById(id);
  }
}

module.exports = { UserService };