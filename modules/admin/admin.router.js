const { Router } = require('express');
const adminController = require('./admin.controller');
const { protectPrivateRoute, chekIsAdmin } = require('../auth/auth.middlewares');

const adminRouter = Router();

adminRouter.get('/', protectPrivateRoute, chekIsAdmin, adminController.getUsersStats);

module.exports = {
  adminRouter,
};
