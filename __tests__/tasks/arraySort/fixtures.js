const { validationMessages } = require('../../../modules/tasks/helpers/constants');

const positive = [
  {
    arr1: [2, 3],
    arr2: [2],

    expectedResult: [2, 3],
  },
  {
    arr1: new Array(1000).fill(2),
    arr2: [2],

    expectedResult: new Array(1000).fill(2),
  },
  {
    arr1: [...new Array(998).fill(2), 5, 4],
    arr2: [2],

    expectedResult: [...new Array(998).fill(2), 4, 5],
  },
  {
    arr1: [2, 3, 1, 3, 2, 4, 6, 7, 9, 2, 19],
    arr2: [2, 1, 4, 3, 9, 6],

    expectedResult: [2, 2, 2, 1, 4, 3, 3, 9, 6, 7, 19],
  },
  {
    arr1: [10, 11, 29, 32, 45, 54, 33, 9, 5, 5, 8, 32, 11, 11, 45],
    arr2: [5, 32, 11, 45],

    expectedResult: [5, 5, 32, 32, 11, 11, 11, 45, 45, 8, 9, 10, 29, 33, 54],
  },
  {
    arr1: [13, 12, 22, 2, 12, 45, 2, 35, 44, 43, 45],
    arr2: [2, 12, 35, 45],

    expectedResult: [2, 2, 12, 12, 35, 45, 45, 13, 22, 43, 44],
  },
  {
    arr1: [13, 12, 22, 344, 2, 12, 45, 2, 32, 1001, 35, 44, 43, 344, 100145],
    arr2: [2, 32, 344, 1001, 45],

    expectedResult: [2, 2, 32, 344, 344, 1001, 45, 12, 12, 13, 22, 35, 43, 44, 100145],
  },
];
const negative = [
  {
    arr1: [2, 3],
    arr2: [],

    expectedResult: validationMessages.arraySort.inavalidLength,
  },
  {
    arr1: [...new Array(998).fill(2), null, 4],
    arr2: [2],

    expectedResult: validationMessages.arraySort.notInteger,
  },
  {
    arr1: [4, 5, 4.5],
    arr2: [4],

    expectedResult: validationMessages.arraySort.notInteger,
  },
  {
    arr1: [4, 5, 4.5],
    arr2: [4, 4.5],

    expectedResult: validationMessages.arraySort.notInteger,
  },
  {
    arr1: [4, 5, 4, 7],
    arr2: [4, 5, 6],

    expectedResult: validationMessages.arraySort.inavalidNumbers,
  },
  {
    arr1: [4, 5, 4, 5],
    arr2: [4, 4],

    expectedResult: validationMessages.arraySort.notDistict,
  },
  {
    arr1: new Array(1001).fill(2),
    arr2: [2],

    expectedResult: validationMessages.arraySort.inavalidLength,
  },
  {
    arr1: [2, 3, 3, 2, 4, 6, 7, 9, 2, 19],
    arr2: [2, 1, 4, 3, 9, 6],

    expectedResult: validationMessages.arraySort.inavalidNumbers,
  },
  {
    arr1: [2, 3, 3, 2, 4, 6, 7, 9, 2, 19],
    arr2: [2, 1, 122, 2, 4, 3, 9, 6],

    expectedResult: validationMessages.arraySort.notDistict,
  },
  {
    arr1: [2],
    arr2: [2, 12, 117, 35, 45],

    expectedResult: validationMessages.arraySort.inavalidLength,
  },
  {
    arr1: {},
    arr2: [5, 32, 11, 45, 222],

    expectedResult: validationMessages.arraySort.invalidType,
  },
  {
    arr1: [2, 1],
    arr2: ['String'],

    expectedResult: validationMessages.arraySort.notInteger,
  },
];

module.exports = { positive, negative };
