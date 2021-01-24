const { checkIsValidString } = require('../../../modules/tasks/tasks.controller');
const { positive, negative } = require('./fixtures');
const { postToRoute } = require('../../helpers');

describe('Test positive fixtures on api route brackets', () => {
  positive.forEach(({ input, expectedResult }) => {
    test(`VALUE - "${input}" should return ${expectedResult}`, async () => {
      const { body } = await postToRoute('/brackets', { input });
      expect(body.result).toBe(expectedResult);
    });
  });
});

describe('Test negative fixtures on api route brackets', () => {
  negative.forEach(({ input, expectedResult }) => {
    test(`VALUE - "${input}" should return error`, async () => {
      const res = await postToRoute('/brackets', { input });
      expect(res.body.message).toBe(expectedResult);
    });
  });
});
