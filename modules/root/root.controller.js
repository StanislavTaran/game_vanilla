const { ResWithMessage } = require('../../helpers/responses');
const userModel = require('../auth/auth.service');
const resultModel = require('../results/results.service');

const getMainPage = async (req, res, next) => {
  if (req.session.userId) {
    try {
      const [user, top10Results, bestUserResult] = await Promise.all([
        userModel.getUserById(req.session.userId),
        resultModel.getTop10Results(),
        resultModel.getBestResultsById(req.session.userId),
      ]);

      res.render('index', {
        user,
        results: top10Results,
        bestUserResult: (bestUserResult[0] && bestUserResult[0]['score']) || 0,
      });
    } catch (e) {
      next(new ResWithMessage(500, e.message));
    }
  } else res.render('login', { message: 'Please Log in', error: {} });
};

module.exports = { getMainPage };
