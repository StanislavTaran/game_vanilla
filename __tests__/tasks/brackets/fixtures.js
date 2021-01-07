const { ResWithMessage } = require('../../../helpers/responses');

const resInvalidInput = new ResWithMessage(400);

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
    expectedResult: resInvalidInput,
  },
  {
    input: false,
    expectedResult: resInvalidInput,
  },
  {
    input: NaN,
    expectedResult: resInvalidInput,
  },
  {
    input: 746387,
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
  {
    input: {},
    expectedResult: resInvalidInput,
  },
  {
    input: [],
    expectedResult: resInvalidInput,
  },
];

module.exports = { positive, negative };
