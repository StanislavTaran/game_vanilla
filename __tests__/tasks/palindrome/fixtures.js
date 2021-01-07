const { ResWithMessage } = require('../../../helpers/responses');

const resInvalidInput = new ResWithMessage(400);

const positive = [
  { input: 111, expectedResult: true },
  { input: 121, expectedResult: true },
  { input: 2992, expectedResult: true },
  { input: 3443443, expectedResult: true },
  { input: 101010101, expectedResult: true },
];
const negative = [
  { input: '2992', expectedResult: resInvalidInput },
  { input: 'string', expectedResult: resInvalidInput },
  { input: null, expectedResult: resInvalidInput },
  { input: undefined, expectedResult: resInvalidInput },
  { input: false, expectedResult: resInvalidInput },
  { input: true, expectedResult: resInvalidInput },
  { input: NaN, expectedResult: resInvalidInput },
];

module.exports = { positive, negative };
