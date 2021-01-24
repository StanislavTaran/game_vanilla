const userModel = require('../auth/auth.service');
const resultModel = require('../results/results.service');

const getUsersStats = async (req, res, next) => {
  try {
    const { user } = req;

    const paginationOptions = {
      page: +req.query.page || 1,
      limit: req.query.limit || 5,
    };

    const users = await userModel.user.paginate(
      {
        name: { $regex: `${req.query.name || '.*'}` },
      },
      paginationOptions,
    );
  console.log(users)
    const bestResult = await resultModel.getBestResultsById(user._id);

    users.docs = await Promise.all(
      users.docs.map(async user => {
        const [bestResult, numberOfGames] = await Promise.all([
          resultModel.getBestResultsById(user._id),
          resultModel.getGamesQtyById(user._id),
        ]);
        return {
          ...user._doc,
          bestUserResult: (bestResult[0] && bestResult[0]['score']) || 0,
          numberOfGames,
        };
      }),
    );

    res.render('admin', {
      user,
      bestUserResult: (bestResult[0] && bestResult[0]['score']) || 0,
      users,
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

module.exports = { getUsersStats };
