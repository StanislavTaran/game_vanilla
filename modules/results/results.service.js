const fs = require('fs').promises;
const uuid = require('uuid').v4;
const resultsPath = './db/db.json';

const getResults = async () => {
  try {
    const results = await fs
      .readFile(resultsPath, 'utf-8')
      .then(res => JSON.parse(res))
      .catch(error => {
        throw error;
      });
    return results;
  } catch (e) {
    throw new Error(e);
  }
};

const saveResult = async result => {
  try {
    const results = await fs
      .readFile(resultsPath, 'utf-8')
      .then(res => JSON.parse(res))
      .catch(error => {
        throw error;
      });
    const resultWithId = { id: uuid(), ...result };
    results.push(resultWithId);
    await fs.writeFile(resultsPath, JSON.stringify(results));
    return resultWithId;
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = { saveResult, getResults };
