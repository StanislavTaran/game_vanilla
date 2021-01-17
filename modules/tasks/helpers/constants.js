const validationMessages = {
  common: {
    invalidFields: 'Body must contain field input with arguments',
  },
  roman: {
    invalidType: 'Argument type must be a string!',
    invalidLength: 'Argument length must be from 1 to 15 characters!',
    invalidCharaters: 'Only Roman numarals allowed!',
  },
  palindrome: {
    invalidType: 'Argument type must be a number!',
    inavalidNumber: 'Argument must be from -2**31 to 2**31 - 1',
  },
  brackets: {
    invalidType: 'Argument type must be a string!',
    invalidLength: 'Argument length must be from 1 to 104 characters!',
    invalidCharaters: 'Only {}()[] symbols allowed!',
  },
  arraySort: {
    invalidType: 'Each argument must be an array!',
    inavalidLength: 'Constraint: arr1 length must be >= 1, arr2 length must be <= 1000',
    notDistict: 'All the elements of arr2 must be distinct.',
    inavalidNumbers: 'Each element from arr2 must exist in arr1.',
  },
  nextIndex: {
    invalidType: 'First argument must be an array with numbers inside. Second argument must be a number',
  },
};

module.exports = { validationMessages };
