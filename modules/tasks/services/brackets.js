const { validationMessages } = require('../helpers/constants');
const { ValidationException } = require('../helpers/exceptionCreators');
const validateBrackets = require('../helpers/validators/brackets.validator');

const isValidBrackets = s => {
  const map = {
    '(': ')',
    '{': '}',
    '[': ']',
  };

  const validatedData = validateBrackets(s, map);

  const stack = [];

  for (let idx = 0; idx < validatedData.length; idx++) {
    if (map[validatedData[idx]]) {
      stack.push(map[validatedData[idx]]);
    } else {
      const elem = stack.pop();
      if (elem !== validatedData[idx]) {
        return false;
      }
    }
  }
  return stack.length === 0;
};

module.exports = { isValidBrackets };
