const validatePalindrome = require('../helpers/validators/palindrome.validator');

const isPalindrom = num => {
  const validatedData = validatePalindrome(num);

  const str = validatedData.toString();
  const reversedString = str.split('').reverse().join('');
  if (str === reversedString) {
    return true;
  } else {
    return false;
  }
};
module.exports = { isPalindrom };
