const protectPrivateRoute = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect('/');
  } else next();
};

const protectPublicRoute = (req, res, next) => {
  if (req.session.userId) {
    res.redirect('/');
  } else next();
};

module.exports = { protectPrivateRoute, protectPublicRoute };
