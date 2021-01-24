const userModel = require('./auth.service');

const protectPrivateRoute = async (req, res, next) => {
  if (!req.session.userId) {
    res.redirect('/');
  } else {
    const user = await userModel.getUserById(req.session.userId);

    req.user = user;
    next();
  }
};

const protectPublicRoute = async (req, res, next) => {
  if (req.session.userId) {
    res.redirect('/');
  } else next();
};

const chekIsAdmin = async (req, res, next) => {
  if (req.user.role !== 'admin') {
    res.redirect('/');
  } else next();
};

module.exports = { protectPrivateRoute, protectPublicRoute, chekIsAdmin };
