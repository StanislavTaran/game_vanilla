const { validationMessages } = require('../../../modules/tasks/helpers/constants');

const positive = [
  {
    input: '}'.repeat(104),
    expectedResult: false,
  },
  {
    input: '}'.repeat(103),
    expectedResult: false,
  },
  {
    input: '[{}]'.repeat(26),
    expectedResult: true,
  },
  {
    input: '{}',
    expectedResult: true,
  },
  {
    input: '({[]})',
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
    input: '['.repeat(105),
    expectedResult: validationMessages.brackets.invalidLength,
  },
  {
    input: '{}'.repeat(53),
    expectedResult: validationMessages.brackets.invalidLength,
  },
  {
    input: '@iohusodfy7o',
    expectedResult: validationMessages.brackets.invalidCharaters,
  },
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
