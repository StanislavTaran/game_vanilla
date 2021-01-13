const { Router } = require('express');
const resultsController = require('./results.controller');
const {redirectToMain}= require('../auth/auth.middlewares')

const resultsRouter = Router();

resultsRouter.get('/',redirectToMain, resultsController.getTop10Results);
resultsRouter.post('/',redirectToMain, resultsController.addResult);

module.exports = {
  resultsRouter,
};
