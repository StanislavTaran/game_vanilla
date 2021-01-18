const { messages } = require('./messages');
const { ValidationException } = require('../../../../helpers/exceptionCreators');

const validate = async ({ login, name, password, confpassword }) => {
  if (typeof login !== 'string') {
    throw new ValidationException(messages.signup.login.invalidContent);
  }

  if (login.toLocaleLowerCase() !== login) {
    throw new ValidationException(messages.signup.login.invalidContent);
  }

  if (typeof login === 'string' && (login.length < 2 || login.length > 15)) {
    throw new ValidationException(messages.signup.login.invalidLength);
  }

  if (typeof name !== 'string') {
    throw new ValidationException(messages.signup.name.invalidContent);
  }
  if (typeof name === 'string' && (name.length < 1 || name.length > 30)) {
    throw new ValidationException(messages.signup.name.invalidLength);
  }

  if (typeof password !== 'string' || typeof confpassword !== 'string') {
    throw new ValidationException(messages.signup.password.incorrectPassword);
  }

  if (password.length < 8) {
    throw new ValidationException(messages.signup.password.invalidLength);
  }
  if (password !== confpassword) {
    throw new ValidationException(messages.signup.password.notMatch);
  }

  return { login, name, password };
};

module.exports = { validate };
