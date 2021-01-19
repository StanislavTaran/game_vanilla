const { ValidationException } = require('../exceptionCreators');
const { validationMessages } = require('../constants');

const validateNextIndex = (list, inputNumber) => {
  if (!Array.isArray(list) || typeof inputNumber !== 'number' || inputNumber === NaN) {
    throw new ValidationException(validationMessages.nextIndex.invalidType);
  }

  const isEveryIntInArray = arr =>
    arr.every(item => typeof item === 'number' && Number.isInteger(item));

  if (!isEveryIntInArray(list)) {
    throw new ValidationException(validationMessages.nextIndex.notInteger);
  }

  const uniqNums = [...new Set(list)];

  if (uniqNums.length !== list.length) {
    throw new ValidationException(validationMessages.nextIndex.notUniq);
  }

  const isSortedArray = arr => {
    let sorted = true;
    for (let i = 1; i < arr.length; i++) {
      if (arr[i - 1] > arr[i]) {
        sorted = false;
        break;
      } else continue;
    }

    return sorted;
  };

  if (!isSortedArray(list)) {
    throw new ValidationException(validationMessages.nextIndex.notSorted);
  }

  return {
    list,
    inputNumber,
  };
};

module.exports = validateNextIndex;
