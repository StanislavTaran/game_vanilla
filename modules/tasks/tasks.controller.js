const taskServices = require('./tasks.service');
const { ResWithMessage } = require('../../helpers/responses');

const convertRomanToArabic = (req, res) => {
  const { body } = req;
  try {
    const result = taskServices.convertRomanToArabic(body.input);
    res.status(200).json({ result });
  } catch (e) {
    if (e.invalidInputData) {
      res.status(400).json(new ResWithMessage(400));
    }
    res.status(500).json(new ResWithMessage(500));
  }
};

const checkIsPalindrome = (req, res) => {
  const { body } = req;
  try {
    const result = taskServices.checkIsPalindrom(body.input);
    res.status(200).json({ result });
  } catch (e) {
    if (e.invalidInputData) {
      res.status(400).json(new ResWithMessage(400));
    }
    res.status(500).json(new ResWithMessage(500));
  }
};

const checkIsValidString = (req, res) => {
  const { body } = req;
  try {
    const result = taskServices.checkIsValidString(body.input);
    res.status(200).json({ result });
  } catch (e) {
    if (e.invalidInputData) {
      res.status(400).json(new ResWithMessage(400));
    }
    res.status(500).json(new ResWithMessage(500));
  }
};

const createSortedArray = (req, res) => {
  const {
    body: { input },
  } = req;
  try {
    const result = taskServices.createSortedArray(input.arr1, input.arr2);
    res.status(200).json({ result });
  } catch (e) {
    if (e.invalidInputData) {
      res.status(400).json(new ResWithMessage(400));
    }
    res.status(500).json(new ResWithMessage(500));
  }
};

const binaryIdxSearch = (req, res) => {
  const {
    body: { input },
  } = req;
  try {
    const result = taskServices.binaryIdxSearch(input.nums, input.target);
    res.status(200).json({ result });
  } catch (e) {
    if (e.invalidInputData) {
      res.status(400).json(new ResWithMessage(400));
    }
    res.status(500).json(new ResWithMessage(500));
  }
};

module.exports = {
  convertRomanToArabic,
  checkIsPalindrom: checkIsPalindrome,
  checkIsValidString,
  createSortedArray,
  binaryIdxSearch,
};
