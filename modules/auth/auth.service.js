const fs = require('fs').promises;

const usersDBPath = './db/users.json';

const getUserById = async userId => {
  try {
    const usersList = await fs
      .readFile(usersDBPath, 'utf-8')
      .then(res => JSON.parse(res))
      .catch(error => {
        throw new Error(error);
      });

    const user = usersList.find(item => item.id === userId);
    return user;
  } catch (error) {
    console.log('Auth Service error');
    throw new Error(error);
  }
};

const getUserByName = async name => {
  try {
    const usersList = await fs
      .readFile(usersDBPath, 'utf-8')
      .then(res => JSON.parse(res))
      .catch(error => {
        throw new Error(error);
      });
    const user = usersList.find(item => item.name === name);
    return user;
  } catch (error) {
    console.log('Auth Service error');
    throw new Error(error);
  }
};

module.exports = { getUserById, getUserByName };
