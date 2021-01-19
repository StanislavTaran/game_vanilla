const { Router } = require('express');
const tasksController = require('./tasks.controller');
const { checkReqBody } = require('./tasks.middlewares');
const { validationMessages } = require('./helpers/constants');
const tasksRouter = Router();

tasksRouter.post(
  '/roman',
  checkReqBody(['input'], validationMessages.common.invalidReqBody),
  tasksController.convertRomanToArabic,
);
tasksRouter.post(
  '/palindrome',
  checkReqBody(['input'], validationMessages.common.invalidReqBody),
  tasksController.checkIsPalindrom,
);
tasksRouter.post(
  '/brackets',
  checkReqBody(['input'], validationMessages.common.invalidReqBody),
  tasksController.checkIsValidString,
);
tasksRouter.post(
  '/arraySort',
  checkReqBody(['arr1', 'arr2'], validationMessages.arraySort.invalidReqBody),
  tasksController.createSortedArray,
);
tasksRouter.post(
  '/nextIndex',
  checkReqBody(['nums', 'target'], validationMessages.nextIndex.invalidReqBody),
  tasksController.binaryIdxSearch,
);

module.exports = {
  tasksRouter,
};
