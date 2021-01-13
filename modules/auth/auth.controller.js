const { getUserByName } = require('./auth.service');
const { ResWithMessage } = require('../../helpers/responses');

const login = async (req, res, next) => {
  const { body } = req;
  try {
    const user = await getUserByName(body.name);
    if (user?.pass === body.pass) {
      req.session.userId = user.id;
    }
    res.redirect('/');
  } catch (e) {
    next(new ResWithMessage(500));
  }
};

const logout = async (req, res, next) => {
  try {
    req.session.destroy(err => {
      res.clearCookie('game-catch');
      res.redirect('/');
    });

  } catch (e) {
    next(new ResWithMessage(500));
  }
};

module.exports = { login, logout };
