const { ResWithMessage } = require('../../../helpers/responses');

const resInvalidInput = new ResWithMessage(400);

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
    input: 'XR',
    expectedResult: resInvalidInput,
  },
  {
    input: 'O',
    expectedResult: resInvalidInput,
  },
  {
    input: 123,
    expectedResult: resInvalidInput,
  },
  {
    input: true,
    expectedResult: resInvalidInput,
  },
  {
    input: NaN,
    expectedResult: resInvalidInput,
  },
  {
    input: ['X'],
    expectedResult: resInvalidInput,
  },
  {
    input: { X: 'X' },
    expectedResult: resInvalidInput,
  },
  {
    input: null,
    expectedResult: resInvalidInput,
  },
  {
    input: undefined,
    expectedResult: resInvalidInput,
  },
];

module.exports = { positive, negative };
