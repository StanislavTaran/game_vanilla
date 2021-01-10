const messages = {
  400: 'Recieved data is invalid! Please, check your data one more time!',
  500: 'Sorry... Something went wrong.Please, try later.',
};

class ResWithMessage {
  constructor(
    statusCode = 400,
    message = messages[statusCode] || 'Unexpected Error',
    error = true,
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.error = error;
  }
}

module.exports = { ResWithMessage, messages };
