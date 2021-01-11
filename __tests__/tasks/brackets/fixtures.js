const {
  validationMessages,
} = require('../../../modules/tasks/helpers/constants');

const positive = [
  {
    input: '{}',
    expectedResult: true,
  },
  {
    input: '({[]})',
    expectedResult: true,
  },
  {
    input: '{()}',
    expectedResult: true,
  },
  {
    input: '[[{[]}]]',
    expectedResult: true,
  },
  {
    input: '{}()[]',
    expectedResult: true,
  },
  {
    input: '[{}]()',
    expectedResult: true,
  },
  {
    input: '{[}]',
    expectedResult: false,
  },
  {
    input: '({}})',
    expectedResult: false,
  },
  {
    input: '({{(}})',
    expectedResult: false,
  },
  {
    input: '[[({(])})]]',
    expectedResult: false,
  },
];

const negative = [
  {
    input: '{f}',
    expectedResult: validationMessages.brackets.invalidCharaters,
  },
  {
    input: false,
    expectedResult: validationMessages.brackets.invalidType,
  },
  {
    input: NaN,
    expectedResult: validationMessages.brackets.invalidType,
  },
  {
    input: 746387,
    expectedResult: validationMessages.brackets.invalidType,
  },
  {
    input: null,
    expectedResult: validationMessages.brackets.invalidType,
  },
  {
    input: undefined,
    expectedResult: validationMessages.common.invalidFields,
  },
  {
    input: {},
    expectedResult: validationMessages.brackets.invalidType,
  },
  {
    input: [],
    expectedResult: validationMessages.brackets.invalidType,
  },
];

module.exports = { positive, negative };
