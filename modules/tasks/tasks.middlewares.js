const { ResWithMessage } = require('../../helpers/responses');
const { validationMessages } = require('./helpers/constants');

const checkReqBody = (fields = ['input'], message = 'error in body request') => (
  req,
  res,
  next,
) => {
  const isExistRequiredFields = fields.every(item => req.body.hasOwnProperty(item));
  if (isExistRequiredFields) {
    return next();
  }
  res.status(400).json(new ResWithMessage(400, message));
};

module.exports = { checkReqBody };
