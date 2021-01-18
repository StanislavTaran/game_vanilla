const { ValidationException } = require('../exceptionCreators');
const { validationMessages } = require('../constants');

const validateArraySort = (drivenArr, principalArr) => {
  if (!Array.isArray(drivenArr) || !Array.isArray(principalArr)) {
    throw new ValidationException(validationMessages.arraySort.invalidType);
  }

  const isValidLengthDrivenArr = drivenArr.length >= 1 && drivenArr.length <= 1000;
  const isValidLengthPrincipalArr = principalArr.length >= 1 && principalArr.length <= 1000;

  if (!isValidLengthDrivenArr || !isValidLengthPrincipalArr) {
    throw new ValidationException(validationMessages.arraySort.inavalidLength);
  }
  const isAllElemsInDriven = principalArr.every(item => drivenArr.includes(item));
  const uniqNumbers = [...new Set(principalArr)];

  if (uniqNumbers.length !== principalArr.length) {
    throw new ValidationException(validationMessages.arraySort.notDistict);
  }

  if (!isAllElemsInDriven) {
    throw new ValidationException(validationMessages.arraySort.inavalidNumbers);
  }

  const isEveryIntInArray = arr =>
    arr.every(item => typeof item === 'number' && Number.isInteger(item));

  if (!isEveryIntInArray(principalArr) || !isEveryIntInArray(drivenArr)) {
    throw new ValidationException(validationMessages.arraySort.notInteger);
  }

  return { drivenArr, principalArr };
};

module.exports = validateArraySort;
