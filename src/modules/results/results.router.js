const { Router } = require('express');
const resultsController = require('./results.controller');

const resultsRouter = Router();

resultsRouter.get('/', resultsController.getTop10Results);

module.exports = {
  resultsRouter,
};
