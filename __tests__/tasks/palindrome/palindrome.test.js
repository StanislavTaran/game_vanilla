const {
  checkIsPalindrome,
} = require('../../../modules/tasks/tasks.controller');
const { positive, negative } = require('./fixtures');
const { postToRoute } = require('../../helpers');

describe('Test positive fixtures on api route palindrome', () => {
  positive.forEach(({ input, expectedResult }) => {
    test(`VALUE - "${input}" should return ${expectedResult}`, async () => {
      const { body } = await postToRoute('/palindrome', { input });
      expect(body.result).toBe(expectedResult);
    });
  });
});

describe('Test negative fixtures on api route palindrome', () => {
  negative.forEach(({ input, expectedResult }) => {
    test(`VALUE - "${input}" should throw exception`, async () => {
      const res = await postToRoute('/palindrome', { input });
      expect(res.body).toEqual(expectedResult);
    });
  });
});
