const db = require('../../db/db.json');
const fs = require('fs/promises');

const resultsPath = './src/db/db.json';

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

module.exports = {
  getTop10Results,
};
