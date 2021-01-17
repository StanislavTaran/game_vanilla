const { validationMessages } = require('../helpers/constants');
const { ValidationException } = require('../helpers/exceptionCreators');

const romanToArabic = inputString => {
  if (typeof inputString !== 'string') {
    throw new ValidationException(validationMessages.roman.invalidType);
  }
  const inputStringLength = inputString.length;

  if (inputStringLength < 1 || inputStringLength > 15) {
    throw new ValidationException(validationMessages.roman.invalidLength);
  }
  const matches = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  const romanNumbers = Object.keys(matches);

  const isEveryCharacterCorrect = [...inputString].every(character =>
    romanNumbers.includes(character),
  );

  if (!isEveryCharacterCorrect) {
    throw new ValidationException(validationMessages.roman.invalidCharaters);
  }

  return [...inputString].reduce((acc, character, idx, charactersList) => {
    return matches[charactersList[idx + 1]] > matches[character]
      ? acc - matches[character]
      : acc + matches[character];
  }, 0);
};

module.exports = { romanToArabic };
