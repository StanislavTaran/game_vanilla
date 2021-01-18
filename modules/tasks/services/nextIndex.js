const { validationMessages } = require('../helpers/constants');
const { ValidationException } = require('../helpers/exceptionCreators');
const validateNextIndex = require('../helpers/validators/nextIndex.validator');

const findNextIdx = (nums, target) => {
  const { list, inputNumber } = validateNextIndex(nums, target);

  let lowIdx = 0;
  let highIdx = list.length - 1;

  let targetIdx = 0;

  if (inputNumber > list[highIdx]) {
    return highIdx + 1;
  } else if (inputNumber < list[0]) {
    return 0;
  }
  while (lowIdx <= highIdx) {
    const middleIdx = Math.trunc(highIdx - lowIdx / 2);
    const guessedNumber = list[middleIdx];

    if (inputNumber === guessedNumber) {
      targetIdx = middleIdx;
      break;
    } else if (inputNumber > guessedNumber) {
      lowIdx = middleIdx + 1;
      targetIdx = lowIdx;
    } else if (inputNumber < guessedNumber) {
      highIdx = middleIdx - 1;
      targetIdx = highIdx;
    }
  }
  return targetIdx;
};

module.exports = { findNextIdx };
