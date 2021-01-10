const {
  validationMessages,
} = require('../../../modules/tasks/helpers/constants');

const positive = [
  { input: 111, expectedResult: true },
  { input: 121, expectedResult: true },
  { input: 2992, expectedResult: true },
  { input: 3443443, expectedResult: true },
  { input: 101010101, expectedResult: true },
];
const negative = [
  { input: '2992', expectedResult: validationMessages.palindrome.invalidType },
  {
    input: 'string',
    expectedResult: validationMessages.palindrome.invalidType,
  },
  { input: null, expectedResult: validationMessages.palindrome.invalidType },
  { input: undefined, expectedResult: validationMessages.common.invalidFields },
  { input: false, expectedResult: validationMessages.palindrome.invalidType },
  { input: true, expectedResult: validationMessages.palindrome.invalidType },
  { input: NaN, expectedResult: validationMessages.palindrome.invalidType },
];

module.exports = { positive, negative };
