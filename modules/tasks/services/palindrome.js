const validate = require('../helpers/validators/palindrome.validator');

const isPalindrom = num => {
  validate.palindrome(num);

  const str = num.toString();
  const reversedString = str.split('').reverse().join('');
  if (str === reversedString) {
    return true;
  } else {
    return false;
  }
};
module.exports = { isPalindrom };
