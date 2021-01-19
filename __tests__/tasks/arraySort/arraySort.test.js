const { createSortedArray } = require('../../../modules/tasks/tasks.controller');
const { positive, negative } = require('./fixtures');
const { postToRoute } = require('../../helpers');

describe('Test positive fixtures on api route arraySort', () => {
  positive.forEach(({ arr1, arr2, expectedResult }) => {
    test(`VALUE  should return expectedResult`, async () => {
      const { body } = await postToRoute('/arraySort', { arr1, arr2 });
      expect(body.result).toEqual(expectedResult);
    });
  });
});

describe('Test negative fixtures on api route arraySort', () => {
  negative.forEach(({ arr1, arr2, expectedResult }) => {
    test(`VALUES  should return MESSAGE ${expectedResult}`, async () => {
      const res = await postToRoute('/arraySort', { arr1, arr2 });
      expect(res.body.message).toBe(expectedResult);
    });
  });
});
