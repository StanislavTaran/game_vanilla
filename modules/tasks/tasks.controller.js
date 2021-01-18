const { romanToArabic } = require('./services/roman');
const { isPalindrom } = require('./services/palindrome');
const { isValidBrackets } = require('./services/brackets');
const { sortArray } = require('./services/arraySort');
const { findNextIdx } = require('./services/nextIndex');

const { ResWithMessage } = require('../../helpers/responses');

const convertRomanToArabic = (req, res, next) => {
  const { body } = req;
  try {
    const result = romanToArabic(body.input);
    res.status(200).json({ result });
  } catch (e) {
    if (e.invalidInputData) {
      next(new ResWithMessage(400, e.message));
    } else {
      next(new ResWithMessage(500));
    }
  }
};

const checkIsPalindrome = (req, res, next) => {
  const { body } = req;
  try {
    const result = isPalindrom(body.input);
    res.status(200).json({ result });
  } catch (e) {
    if (e.invalidInputData) {
      next(new ResWithMessage(400, e.message));
    } else {
      next(new ResWithMessage(500));
    }
  }
};

const checkIsValidString = (req, res, next) => {
  const { body } = req;
  try {
    const result = isValidBrackets(body.input);
    res.status(200).json({ result });
  } catch (e) {
    if (e.invalidInputData) {
      next(new ResWithMessage(400, e.message));
    } else {
      next(new ResWithMessage(500));
    }
  }
};

const createSortedArray = (req, res, next) => {
  const {
    body: { arr1, arr2 },
  } = req;
  try {
    const result = sortArray(arr1, arr2);
    res.status(200).json({ result });
  } catch (e) {
    if (e.invalidInputData) {
      next(new ResWithMessage(400, e.message));
    } else {
      next(new ResWithMessage(500));
    }
  }
};

const binaryIdxSearch = (req, res, next) => {
  const {
    body: { nums, target },
  } = req;
  try {
    const result = findNextIdx(nums, target);
    res.status(200).json({ result });
  } catch (e) {
    if (e.invalidInputData) {
      next(new ResWithMessage(400, e.message));
    } else {
      next(new ResWithMessage(500));
    }
  }
};

module.exports = {
  convertRomanToArabic,
  checkIsPalindrom: checkIsPalindrome,
  checkIsValidString,
  createSortedArray,
  binaryIdxSearch,
};
