const { validationMessages } = require('./constants');

class ValidationException extends Error {
  constructor(message, isInvalidData = true) {
    super();
    this.invalidInputData = isInvalidData;
    this.message = message;
  }
}

module.exports = { ValidationException };
