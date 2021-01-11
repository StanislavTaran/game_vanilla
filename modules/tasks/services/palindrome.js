const { validationMessages } = require('../helpers/constants');
const { ValidationException } = require('../helpers/exceptionCreators');

const isPalindrom = num => {
  if (typeof num !== 'number' || num === NaN) {
    throw new ValidationException(validationMessages.palindrome.invalidType);
  }
  const isNumberValid = (-2) ** 31 <= num && num <= 2 ** 31 - 1;

  if (!isNumberValid) {
    throw new ValidationException(validationMessages.palindrome.inavalidNumber);
  } else {
    const str = num.toString();
    const reversedString = str.split('').reverse().join('');
    if (str === reversedString) {
      return true;
    } else {
      return false;
    }
  }
};
module.exports = { isPalindrom };
