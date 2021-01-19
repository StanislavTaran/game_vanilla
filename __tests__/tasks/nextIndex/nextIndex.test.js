const { binaryIdxSearch } = require('../../../modules/tasks/tasks.controller');
const { positive, negative } = require('./fixtures');
const { postToRoute } = require('../../helpers');

describe('Test positive fixtures on api route arraySort', () => {
  positive.forEach(({ nums, target, expectedResult }) => {
    test(`Target "${target}"  should return ${expectedResult}`, async () => {
      const { body } = await postToRoute('/nextIndex', { nums, target });
      expect(body.result).toBe(expectedResult);
    });
  });
});

describe('Test negative fixtures on api route arraySort', () => {
  negative.forEach(({ nums, target, expectedResult }) => {
    test(`should return MESSAGE ${expectedResult}`, async () => {
      const res = await postToRoute('/nextIndex', { nums, target });
      expect(res.body.message).toBe(expectedResult);
    });
  });
});
