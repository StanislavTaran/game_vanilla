const { Router } = require('express');
const tasksController = require('./tasks.controller');
const { checkReqBody } = require('./tasks.middlewares');
const tasksRouter = Router();

tasksRouter.post('/roman', checkReqBody, tasksController.convertRomanToArabic);
tasksRouter.post('/palindrome', checkReqBody, tasksController.checkIsPalindrom);
tasksRouter.post('/brackets', checkReqBody, tasksController.checkIsValidString);
tasksRouter.post('/arraySort', checkReqBody, tasksController.createSortedArray);
tasksRouter.post('/nextIndex', checkReqBody, tasksController.binaryIdxSearch);

module.exports = {
  tasksRouter,
};
