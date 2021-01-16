const { ValidationException } = require('../exceptionCreators');
const { validationMessages } = require('../constants');

const roman = (data, matches) => {
  if (typeof data !== 'string') {
    throw new ValidationException(validationMessages.roman.invalidType);
  } else {
    data.toUpperCase();
  }

  const inputStringLength = data.length;

  if (inputStringLength < 1 || inputStringLength > 15) {
    throw new ValidationException(validationMessages.roman.invalidLength);
  }

  const romanNumbers = Object.keys(matches);

  const isEveryCharacterCorrect = [...data].every(character => romanNumbers.includes(character));

  if (!isEveryCharacterCorrect) {
    throw new ValidationException(validationMessages.roman.invalidCharaters);
  }

  const letterCount = str => {
    const countedChar = str.match(/([a-zA-Z])\1*/g) || [];
    return countedChar.map(item => [item.charAt(0), item.length]).every(item => item[1] <= 3);
  };
  if (!letterCount(data)) {
    throw new ValidationException(validationMessages.roman.incorrectContent);
  }

  const regEx = /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
  const validMatches = data.match(regEx);

  if (validMatches === null) {
    throw new ValidationException(validationMessages.roman.incorrectContent);
  }

  return true;
};

module.exports = { roman };
