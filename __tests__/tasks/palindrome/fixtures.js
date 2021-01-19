const { validationMessages } = require('../../../modules/tasks/helpers/constants');

const positive = [
  {
    input: (-2) ** 31 + 1,
    expectedResult: false,
  },
  {
    input: (-2) ** 31,
    expectedResult: false,
  },
  {
    input: 2 ** 31 - 1,
    expectedResult: false,
  },
  {
    input: 2 ** 31 - 2,
    expectedResult: false,
  },
  { input: '2992', expectedResult: true },
  { input: 111, expectedResult: true },
  { input: 121, expectedResult: true },
  { input: 2992, expectedResult: true },
  { input: 3443443, expectedResult: true },
  { input: 101010101, expectedResult: true },
];
const negative = [
  {
    input: (-2) ** 31 - 1,
    expectedResult: validationMessages.palindrome.inavalidNumber,
  },
  {
    input: 2 ** 31,
    expectedResult: validationMessages.palindrome.inavalidNumber,
  },
  {
    input: 2 ** 31 + 1,
    expectedResult: validationMessages.palindrome.inavalidNumber,
  },
  {
    input: 'string',
    expectedResult: validationMessages.palindrome.invalidType,
  },
  { input: null, expectedResult: validationMessages.palindrome.invalidType },
  { input: undefined, expectedResult: validationMessages.common.invalidReqBody },
  { input: false, expectedResult: validationMessages.palindrome.invalidType },
  { input: true, expectedResult: validationMessages.palindrome.invalidType },
  { input: NaN, expectedResult: validationMessages.palindrome.invalidType },
];

module.exports = { positive, negative };
