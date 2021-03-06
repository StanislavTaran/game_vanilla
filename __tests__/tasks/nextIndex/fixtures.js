const {
  validationMessages,
} = require('../../../modules/tasks/helpers/constants');

const positive = [
  {
    input: {
      nums: [1, 3, 5, 6],
      target: 0,
    },
    expectedResult: 0,
  },
  {
    input: {
      nums: [1, 3, 5, 6, 9, 12],
      target: 1,
    },
    expectedResult: 0,
  },
  {
    input: {
      nums: [1, 3, 5, 6, 9, 12],
      target: 14,
    },
    expectedResult: 6,
  },
  {
    input: {
      nums: [1, 3, 5, 6, 9, 12],
      target: 2,
    },
    expectedResult: 1,
  },
  {
    input: {
      nums: [1, 3, 5, 6, 9, 12],
      target: 11,
    },
    expectedResult: 5,
  },
];
const negative = [
  {
    input: {
      nums: [2, 3, 1, 3, 2, 4, 6, 7, 9, 2, 19],
      target: null,
    },
    expectedResult: validationMessages.nextIndex.invalidType,
  },
  {
    input: {
      nums: { a: 1, 2: 'a' },
      target: 6,
    },
    expectedResult: validationMessages.nextIndex.invalidType,
  },
  {
    input: {
      nums: [11, 22, 222],
    },
    expectedResult: validationMessages.nextIndex.invalidType,
  },
];

module.exports = { positive, negative };
