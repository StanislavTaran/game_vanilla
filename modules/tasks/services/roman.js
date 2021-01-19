const validateRoman = require('../helpers/validators/roman.validator');

const romanToArabic = inputString => {
  const matches = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  const validatedData = validateRoman(inputString, matches);

  return [...validatedData].reduce((acc, character, idx, charactersList) => {
    return matches[charactersList[idx + 1]] > matches[character]
      ? acc - matches[character]
      : acc + matches[character];
  }, 0);
};

module.exports = { romanToArabic };
