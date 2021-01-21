const mongoose = require('mongoose');
const { userSchema } = require('./entities/user.schema');

class User {
  constructor() {
    this.user = mongoose.model('user', userSchema);
  }

  getUsers = async (query = {}) => {
    return await this.user
      .find(query)
      .then(docs => docs)
      .catch(error => {
        throw error;
      });
  };

  getUserById = async id => {
    return await this.user
      .findById(id)
      .then(doc => doc)
      .catch(error => {
        throw error;
      });
  };

  getUserByLogin = async login => {
    return await this.user
      .findOne({ login })
      .then(doc => doc)
      .catch(error => {
        throw error;
      });
  };

  createUser = async data => {
    return await this.user
      .create(data)
      .then(doc => doc)
      .catch(error => {
        throw error;
      });
  };
}

module.exports = new User();
