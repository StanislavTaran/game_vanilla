const { ResWithMessage } = require('../../helpers/responses');
const userModel = require('../auth/auth.service');
const resultModel = require('../results/results.service');

const getMainPage = async (req, res, next) => {
  if (req.session.userId) {
    try {
      const [user, top10Results, userResults] = await Promise.all([
        userModel.getUserById(req.session.userId),
        resultModel.getTop10Results(),
        resultModel.getResultsById(req.session.userId),
      ]);

      const bestUserResult = userResults.length
        ? userResults.sort((a, b) => b.score - a.score)[0]['score']
        : 0;

      res.render('index', {
        userName: user.name,
        results: top10Results,
        bestUserResult,
      });
    } catch (e) {
      next(new ResWithMessage(500, e.message));
    }
  } else res.render('login', { message: 'Please Log in', error: {} });
};

module.exports = { getMainPage };
