const taskServices = require('./tasks.service');
const { ResWithMessage } = require('../../helpers/responses');

const convertRomanToArabic = (req, res) => {
  const { body } = req;
  try {
    const result = taskServices.convertRomanToArabic(body.input);
    res.status(200).json(result);
  } catch (e) {
    if (e.invalidInputData) {
      res.status(400).json(new ResWithMessage(400));
    }
    res.status(500).json(new ResWithMessage(500));
  }
};

const checkIsPalindrom = (req, res) => {
  const { body } = req;
  try {
    const result = taskServices.checkIsPalindrom(body.input);
    res.status(200).json(result);
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
    res.status(200).json(result);
  } catch (e) {
    if (e.invalidInputData) {
      res.status(400).json(new ResWithMessage(400));
    }
    res.status(500).json(new ResWithMessage(500));
  }
};

const createSortedArray = (req, res) => {
  const {
    body: { arr1, arr2 },
  } = req;
  try {
    const result = taskServices.createSortedArray(arr1, arr2);
    res.status(200).json(result);
  } catch (e) {
    if (e.invalidInputData) {
      res.status(400).json(new ResWithMessage(400));
    }
    res.status(500).json(new ResWithMessage(500));
  }
};

const binaryIdxSearch = (req, res) => {
  const {
    body: { nums, target },
  } = req;
  try {
    const result = taskServices.binaryIdxSearch(nums, target);
    res.status(200).json(result);
  } catch (e) {
    if (e.invalidInputData) {
      res.status(400).json(new ResWithMessage(400));
    }
    res.status(500).json(new ResWithMessage(500));
  }
};

module.exports = {
  convertRomanToArabic,
  checkIsPalindrom,
  checkIsValidString,
  createSortedArray,
  binaryIdxSearch,
};
