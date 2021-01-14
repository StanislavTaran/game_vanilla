const { saveResult, getResults } = require('./results.service');
const { getUserById } = require('../auth/auth.service');
const getTop10Results = async (req, res) => {
  try {
    const results = await getResults();
    const top10Results = results.sort((a, b) => b.score - a.score).slice(0, 10);
    res.status(200).json(top10Results);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};

const addResult = async (req, res) => {
  const { body, session } = req;
  const { name } = await getUserById(session.userId);
  try {
    const resultWithId = await saveResult({ ...body, name });
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
