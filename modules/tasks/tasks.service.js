class ValidationException {
  constructor() {
    this.invalidInputData = true;
  }
}

const convertRomanToArabic = inputString => {
  if (typeof inputString !== 'string') {
    throw new ValidationException();
  }

  const matches = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  const romanNumbers = Object.keys(matches);
  const isEveryCharacterCorrect = [...inputString].every(character =>
    romanNumbers.includes(character),
  );

  const inputStringLength = inputString.length;

  if (
    inputStringLength < 1 ||
    inputStringLength > 15 ||
    !isEveryCharacterCorrect
  ) {
    throw new ValidationException();
  }

  return [...inputString].reduce((acc, character, idx, charactersList) => {
    return matches[charactersList[idx + 1]] > matches[character]
      ? acc - matches[character]
      : acc + matches[character];
  }, 0);
};

const checkIsPalindrom = num => {
  const isNumberValid = (-2) ** 31 <= num && num <= 2 ** 31 - 1;

  if (typeof num !== 'number' || num === NaN || !isNumberValid) {
    throw new ValidationException();
  } else {
    const str = num.toString();
    const reversedString = str.split('').reverse().join('');
    if (str === reversedString) {
      return true;
    } else {
      return false;
    }
  }
};

const checkIsValidString = s => {
  if (typeof s !== 'string') {
    throw new ValidationException();
  }
  const map = {
    '(': ')',
    '{': '}',
    '[': ']',
  };

  const rightParentheses = Object.values(map);
  const leftParentheses = Object.keys(map);

  const isOnlyValidPar = [...s].every(
    item => rightParentheses.includes(item) || leftParentheses.includes(item),
  );

  if (s.length < 1 || s.length > 104 || !isOnlyValidPar) {
    throw new ValidationException();
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

const createSortedArray = (drivenArr, principalArr) => {
  if (!Array.isArray(drivenArr) || !Array.isArray(principalArr)) {
    throw new ValidationException();
  }
  const isValidLength = drivenArr.length >= 1 && principalArr.length <= 1000;
  const isAllElemsInDriven = principalArr.every(item =>
    drivenArr.includes(item),
  );
  const uniqNumbers = [...new Set(principalArr)];

  if (
    !isAllElemsInDriven ||
    !isValidLength ||
    uniqNumbers.length !== principalArr.length
  ) {
    throw new ValidationException();
  }

  const notIncludedNumbersList = drivenArr.filter(
    item => !principalArr.includes(item),
  );

  const result = [];
  for (let idx = 0; idx < principalArr.length; idx++) {
    result.push(...drivenArr.filter(item => item === principalArr[idx]));
  }
  return [...result, ...notIncludedNumbersList.sort((a, b) => a - b)];
};

const binaryIdxSearch = (list, inputNumber) => {
  if (
    !Array.isArray(list) ||
    typeof inputNumber !== 'number' ||
    inputNumber === NaN
  ) {
    throw new ValidationException();
  }

  let lowIdx = 0;
  let highIdx = list.length - 1;

  let targetIdx = null;

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

module.exports = {
  convertRomanToArabic,
  checkIsPalindrom,
  checkIsValidString,
  createSortedArray,
  binaryIdxSearch,
};
