const { validationMessages } = require('../helpers/constants');
const { ValidationException } = require('../helpers/exceptionCreators');

const sortArray = (drivenArr, principalArr) => {
  if (!Array.isArray(drivenArr) || !Array.isArray(principalArr)) {
    throw new ValidationException(validationMessages.arraySort.invalidType);
  }
  const isValidLength = drivenArr.length >= 1 && principalArr.length <= 1000;
  if (!isValidLength) {
    throw new ValidationException(validationMessages.arraySort.inavalidLength);
  }
  const isAllElemsInDriven = principalArr.every(item =>
    drivenArr.includes(item),
  );
  const uniqNumbers = [...new Set(principalArr)];

  if (uniqNumbers.length !== principalArr.length) {
    throw new ValidationException(validationMessages.arraySort.notDistict);
  }

  if (!isAllElemsInDriven) {
    throw new ValidationException(validationMessages.arraySort.inavalidNumbers);
  }

  const notIncludedNumbersList = drivenArr.filter(
    item => !principalArr.includes(item),
  );

  const result = [];
  for (let idx = 0; idx < principalArr.length; idx++) {
    result.push(...drivenArr.filter(item => item === principalArr[idx]));
  }
  return [...result, ...notIncludedNumbersList.sort((a, b) => a - b)];
};

module.exports = { sortArray };
