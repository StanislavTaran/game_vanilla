const { validationMessages } = require('../../../modules/tasks/helpers/constants');

const positive = [
  {
    input: {
      arr1: [2, 3, 1, 3, 2, 4, 6, 7, 9, 2, 19],
      arr2: [2, 1, 4, 3, 9, 6],
    },
    expectedResult: [2, 2, 2, 1, 4, 3, 3, 9, 6, 7, 19],
  },
  {
    input: {
      arr1: [10, 11, 29, 32, 45, 54, 33, 9, 5, 5, 8, 32, 11, 11, 45],
      arr2: [5, 32, 11, 45],
    },
    expectedResult: [5, 5, 32, 32, 11, 11, 11, 45, 45, 8, 9, 10, 29, 33, 54],
  },
  {
    input: {
      arr1: [13, 12, 22, 2, 12, 45, 2, 35, 44, 43, 45],
      arr2: [2, 12, 35, 45],
    },
    expectedResult: [2, 2, 12, 12, 35, 45, 45, 13, 22, 43, 44],
  },
  {
    input: {
      arr1: [13, 12, 22, 344, 2, 12, 45, 2, 32, 1001, 35, 44, 43, 344, 100145],
      arr2: [2, 32, 344, 1001, 45],
    },
    expectedResult: [2, 2, 32, 344, 344, 1001, 45, 12, 12, 13, 22, 35, 43, 44, 100145],
  },
];
const negative = [
  {
    input: {
      arr1: [2, 3, 3, 2, 4, 6, 7, 9, 2, 19],
      arr2: [2, 1, 4, 3, 9, 6],
    },
    expectedResult: validationMessages.arraySort.inavalidNumbers,
  },
  {
    input: {
      arr1: [2, 3, 3, 2, 4, 6, 7, 9, 2, 19],
      arr2: [2, 1, 122, 2, 4, 3, 9, 6],
    },
    expectedResult: validationMessages.arraySort.notDistict,
  },
  {
    input: {
      arr1: [2],
      arr2: [2, 12, 117, 35, 45],
    },
    expectedResult: validationMessages.arraySort.inavalidNumbers,
  },
  {
    input: {
      arr1: {},
      arr2: [5, 32, 11, 45, 222],
    },
    expectedResult: validationMessages.arraySort.invalidType,
  },
];

module.exports = { positive, negative };
