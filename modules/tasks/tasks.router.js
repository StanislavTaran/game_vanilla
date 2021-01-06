const { Router } = require('express');
const tasksController = require('./tasks.controller');
const tasksRouter = Router();

tasksRouter.post('/roman', tasksController.convertRomanToArabic);
tasksRouter.post('/palindrome', tasksController.checkIsPalindrom);
tasksRouter.post('/brackets', tasksController.checkIsValidString);
tasksRouter.post('/arraySort', tasksController.createSortedArray);
tasksRouter.post('/nextIndex', tasksController.binaryIdxSearch);

module.exports = {
  tasksRouter,
};
