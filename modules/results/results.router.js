const { Router } = require('express');
const resultsController = require('./results.controller');
const { protectPrivateRoute } = require('../auth/auth.middlewares');

const resultsRouter = Router();

resultsRouter.get('/', protectPrivateRoute, resultsController.getTop10Results);
resultsRouter.post('/', protectPrivateRoute, resultsController.addResult);

module.exports = {
  resultsRouter,
};
