const resultModel = require('./results.service');
const userModel = require('../auth/auth.service');

const getTop10Results = async (req, res, next) => {
  try {
    const top10Results = await resultModel.getTop10Results();
    res.status(200).json(top10Results);
  } catch (e) {
    console.log(e);
    next(e);
  }
};

const addResult = async (req, res, next) => {
  const { body, session } = req;
  const { name } = await userModel.getUserById(session.userId);
  try {
    const savedResult = await resultModel.saveResult({
      score: Number(body.score),
      name,
      date: new Date(),
      userId: session.userId,
    });
    res.status(201).json(savedResult);
  } catch (e) {
    console.log(e);
    next(e);
  }
};

module.exports = {
  getTop10Results,
  addResult,
};
