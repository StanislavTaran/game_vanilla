const fs = require('fs').promises;
const uniqid = require('uniqid');
const db = require('../../db/db.json');

const resultsPath = './db/db.json';

const getTop10Results = async (req, res) => {
  try {
    const results = await fs
      .readFile(resultsPath, 'utf-8')
      .then(res => JSON.parse(res))
      .catch(error => {
        throw error;
      });
    const top10Results = results.sort((a, b) => b.score - a.score).slice(0, 10);
    res.status(200).json(top10Results);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};

const addResult = async (req, res) => {
  const { body } = req;

  try {
    const results = await fs
      .readFile(resultsPath, 'utf-8')
      .then(res => JSON.parse(res))
      .catch(error => {
        throw error;
      });
    const resultWithId = { id: uniqid(), ...body };
    results.push(resultWithId);
    await fs.writeFile(resultsPath, JSON.stringify(results));
    res.status(201).json(resultWithId);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};

module.exports = {
  getTop10Results,
  addResult,
};
