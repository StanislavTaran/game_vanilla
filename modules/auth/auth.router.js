const { Router } = require('express');
const authController = require('./auth.controller');
const { protectPublicRoute } = require('./auth.middlewares');

const authRouter = Router();

authRouter.post('/login', protectPublicRoute, authController.login);
authRouter.post('/signup', protectPublicRoute, authController.signup);
authRouter.post('/logout', authController.logout);

authRouter.get('/login', protectPublicRoute, (req, res) => {
  return res.render('login', { message: 'Please Log in', error: {} });
});
authRouter.get('/signup', protectPublicRoute, (req, res) => {
  return res.render('signup', { message: 'Please Sign Up', error: {} });
});

module.exports = {
  authRouter,
};
