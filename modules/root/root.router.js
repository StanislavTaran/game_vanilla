const { Router } = require('express');
const rootController = require('./root.controller');

const rootRouter = Router();

rootRouter.get('/', rootController.getMainPage);

module.exports = {
  rootRouter,
};
