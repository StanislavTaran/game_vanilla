const validationMessages = {
  common: {
    invalidReqBody: 'Body must contain field input with arguments',
  },
  roman: {
    invalidType: 'Argument type must be a string!',
    invalidLength: 'Argument length must be from 1 to 15 characters!',
    invalidCharaters: 'Only Roman numarals allowed!',
    incorrectContent: 'Recived number is incorrect',
  },
  palindrome: {
    invalidType: 'Argument must be a number!',
    inavalidNumber: 'Argument must to be from -2**31 to 2**31 - 1',
    notInteger: 'Argument must to be an integer.',
  },
  brackets: {
    invalidType: 'Argument type must be a string!',
    invalidLength: 'Argument length must be from 1 to 104 characters!',
    invalidCharaters: 'Only {}()[] symbols allowed!',
  },
  arraySort: {
    invalidReqBody: 'Body must contain fields arr1 and arr2',
    invalidType: 'Each argument (arr1 and arr2) must be an array!',
    inavalidLength:
      'Constraint: arr1 length must be >= 1 and <= 1000 , arr2 length must be > 0 and < arr1 length',
    notDistict: 'All the elements of arr2 must be distinct.',
    notInteger: 'All the elements in arrays must be integer numbers.',
    inavalidNumbers: 'Each element from arr2 must exist in arr1.',
  },
  nextIndex: {
    invalidReqBody: 'Body must contain fields nums and target',
    invalidType:
      'First argument (nums) must be an array with numbers inside. Second argument (target) must be a number',
    notUniq: 'All ellements in array must be unique.',
    notInteger: 'All the elements in array must be integer numbers.',
    notSorted: 'Numbers in array must be sorted in ascending order.',
  },
};

module.exports = { validationMessages };
