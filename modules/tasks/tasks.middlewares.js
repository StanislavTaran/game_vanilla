const { ResWithMessage } = require('../../helpers/responses');
const { validationMessages } = require('./helpers/constants');

const checkReqBody = (req, res, next) => {
  if (req.body.hasOwnProperty('input')) {
    //for testing 500 statusCode
    if (req.body.input === 'E500') {
      return next(new ResWithMessage(500));
    }
    return next();
  }

  res
    .status(400)
    .json(new ResWithMessage(400, validationMessages.common.invalidFields));
};

module.exports = { checkReqBody };
