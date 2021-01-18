const { validationMessages } = require('../helpers/constants');
const { ValidationException } = require('../helpers/exceptionCreators');
const validateArraySort = require('../helpers/validators/arraySort.validator');

const sortArray = (arr1, arr2) => {
  const { drivenArr, principalArr } = validateArraySort(arr1, arr2);

  const notIncludedNumbersList = drivenArr.filter(item => !principalArr.includes(item));
  const result = [];
  for (let idx = 0; idx < principalArr.length; idx++) {
    result.push(...drivenArr.filter(item => item === principalArr[idx]));
  }
  return [...result, ...notIncludedNumbersList.sort((a, b) => a - b)];
};

module.exports = { sortArray };
