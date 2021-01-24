const { ResWithMessage, messages } = require('./responses');
const authMessages = require('../modules/auth/helpers/validation/messages');

const handleGlobalErrors = (error, req, res, next) => {
  if (error.name === 'MongoError' && error.code === 11000) {
    return res.status(400).send(authMessages.messages.signup.login.notUniq);
  }

  if (!error.statusCode) {
    error.statusCode = 500;
  }
  if (!error.message) {
    error.message = messages[error.statusCode];
  }
  return res.status(error.statusCode).json(error.message);
};

module.exports = { handleGlobalErrors };
