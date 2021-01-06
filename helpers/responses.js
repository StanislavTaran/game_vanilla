const messages = {
  400: 'Recieved data is invalid!',
  404: 'Page not found...',
  500: 'Sorry... Something went wrong.',
};

class ResWithMessage {
  constructor(
    code = 400,
    message = messages[code] || messages[400],
    error = true,
  ) {
    this.code = code;
    this.message = message;
    this.error = error;
  }
}

module.exports = { ResWithMessage, messages };
