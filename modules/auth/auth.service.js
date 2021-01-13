const fs = require('fs').promises;

const usersDBPath = './db/users.json';

const getUserByName = async name => {
  try {
    const usersList = await fs
      .readFile(usersDBPath, 'utf-8')
      .then(res => JSON.parse(res))
      .catch(error => {
        throw new Error(error);
      });

    const user = usersList.find(item => item.name === name);
    console.log('user', user);
    return user;
  } catch (error) {
    console.log('Service error');
    throw new Error(error);
  }
};

module.exports = { getUserByName };
