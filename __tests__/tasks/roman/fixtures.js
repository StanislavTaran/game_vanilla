const { validationMessages } = require('../../../modules/tasks/helpers/constants');
const { messages } = require('../../../helpers/responses');

const positive = [
  {
    input: 'I',
    expectedResult: 1,
  },
  {
    input: 'IX',
    expectedResult: 9,
  },
  {
    input: 'III',
    expectedResult: 3,
  },
  {
    input: 'LVIII',
    expectedResult: 58,
  },

  {
    input: 'MCMXCIV',
    expectedResult: 1994,
  },
];

const negative = [
  {
    input: 'E500',
    expectedResult: messages[500],
  },
  {
    input: 'XR',
    expectedResult: validationMessages.roman.invalidCharaters,
  },
  {
    input: 'XR',
    expectedResult: validationMessages.roman.invalidCharaters,
  },
  {
    input: 'O',
    expectedResult: validationMessages.roman.invalidCharaters,
  },
  {
    input: 123,
    expectedResult: validationMessages.roman.invalidType,
  },
  {
    input: true,
    expectedResult: validationMessages.roman.invalidType,
  },
  {
    input: NaN,
    expectedResult: validationMessages.roman.invalidType,
  },
  {
    input: ['X'],
    expectedResult: validationMessages.roman.invalidType,
  },
  {
    input: { X: 'X' },
    expectedResult: validationMessages.roman.invalidType,
  },
  {
    input: null,
    expectedResult: validationMessages.roman.invalidType,
  },
  {
    input: undefined,
    expectedResult: validationMessages.common.invalidFields,
  },
];

module.exports = { positive, negative };
