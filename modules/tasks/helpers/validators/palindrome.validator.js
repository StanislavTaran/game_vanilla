const { ValidationException } = require('../exceptionCreators');
const { validationMessages } = require('../constants');

const palindrome = num => {
  const typeOfData = typeof num;
  if (typeOfData !== 'string' && typeOfData !== 'number') {
    throw new ValidationException(validationMessages.palindrome.invalidType);
  }

  if (typeOfData === 'string') {
    const parsedNum = Number(num);
    if (Number.isNaN(parsedNum)) {
      throw new ValidationException(validationMessages.palindrome.invalidType);
    }

    if (!Number.isInteger(parsedNum)) {
      throw new ValidationException(validationMessages.palindrome.notInteger);
    }
  }

  const isNumberValid = (-2) ** 31 <= num && num <= 2 ** 31 - 1;

  if (!isNumberValid) {
    throw new ValidationException(validationMessages.palindrome.inavalidNumber);
  }

  return true;
};

module.exports = { palindrome };
