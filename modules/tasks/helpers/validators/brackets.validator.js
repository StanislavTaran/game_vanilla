const { ValidationException } = require('../exceptionCreators');
const { validationMessages } = require('../constants');

const validateBrackets = (str, map) => {
  if (typeof str !== 'string') {
    throw new ValidationException(validationMessages.brackets.invalidType);
  }

  if (str.length < 1 || str.length > 104) {
    throw new ValidationException(validationMessages.brackets.invalidLength);
  }

  const rightParentheses = Object.values(map);
  const leftParentheses = Object.keys(map);

  const isOnlyValidPar = [...str].every(
    item => rightParentheses.includes(item) || leftParentheses.includes(item),
  );
  if (!isOnlyValidPar) {
    throw new ValidationException(validationMessages.brackets.invalidCharaters);
  }

  return str;
};

module.exports = validateBrackets;
