const { validationMessages } = require('../helpers/constants');
const { ValidationException } = require('../helpers/exceptionCreators');

const isValidBrackets = s => {
  if (typeof s !== 'string') {
    throw new ValidationException(validationMessages.brackets.invalidType);
  }

  if (s.length < 1 || s.length > 104) {
    throw new ValidationException(validationMessages.brackets.invalidLength);
  }
  const map = {
    '(': ')',
    '{': '}',
    '[': ']',
  };

  const rightParentheses = Object.values(map);
  const leftParentheses = Object.keys(map);

  const isOnlyValidPar = [...s].every(item => rightParentheses.includes(item) || leftParentheses.includes(item));
  if (!isOnlyValidPar) {
    throw new ValidationException(validationMessages.brackets.invalidCharaters);
  }

  const stack = [];

  for (let idx = 0; idx < s.length; idx++) {
    if (map[s[idx]]) {
      stack.push(map[s[idx]]);
    } else {
      const elem = stack.pop();
      if (elem !== s[idx]) {
        return false;
      }
    }
  }
  return stack.length === 0;
};

module.exports = { isValidBrackets };
