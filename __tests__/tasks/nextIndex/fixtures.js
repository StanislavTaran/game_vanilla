const { validationMessages } = require('../../../modules/tasks/helpers/constants');

const positive = [
  {
    nums: [1, 3, 5, 6],
    target: 0,

    expectedResult: 0,
  },
  {
    nums: [],
    target: -1,

    expectedResult: 0,
  },
  {
    nums: [1, 3, 5, 6, 9, 12],
    target: 1,

    expectedResult: 0,
  },
  {
    nums: [1, 3, 5, 6, 9, 12],
    target: 14,

    expectedResult: 6,
  },
  {
    nums: [1, 3, 5, 6, 9, 12],
    target: 2,

    expectedResult: 1,
  },
  {
    nums: [1, 3, 5, 6, 9, 12],
    target: 11,

    expectedResult: 5,
  },
];
const negative = [
  {
    nums: [2, 3, 1, 3, 2, 4, 6, 7, 9, 2, 19],
    target: null,

    expectedResult: validationMessages.nextIndex.invalidType,
  },
  {
    nums: [2, 3, 5],
    target: "2",

    expectedResult: validationMessages.nextIndex.invalidType,
  },
  {
    nums: [2, 3, 1, 3, 2, 4, 6, 7, 9, 2, 19],
    target: 2,

    expectedResult: validationMessages.nextIndex.notUniq,
  },
  {
    nums: [2, 3, "5", 19],
    target: 2,

    expectedResult: validationMessages.nextIndex.notInteger,
  },
  {
    nums: [2, 3, 21, 19],
    target: 2,

    expectedResult: validationMessages.nextIndex.notSorted,
  },
  {
    nums: [3, 2, 15, 19],
    target: 2,

    expectedResult: validationMessages.nextIndex.notSorted,
  },
  {
    nums: { a: 1, 2: 'a' },
    target: 6,

    expectedResult: validationMessages.nextIndex.invalidType,
  },
  {
    nums: [11, 22, 222],

    expectedResult: validationMessages.nextIndex.invalidType,
  },
  {
    nums: ["string"],
    target: 5,

    expectedResult: validationMessages.nextIndex.notInteger,
  }
];

module.exports = { positive, negative };
