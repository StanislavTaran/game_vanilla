var CryptoJS = require('crypto-js');
const userModel = require('./auth.service');
const { ResWithMessage } = require('../../helpers/responses');
const { sanitize } = require('./helpers/sanitaze');
const { validate } = require('./helpers/validation/signUpValidate');

const AUTH_CRYPTO_KEY = 'aoidhapydoaydoa76d876as9d6atd69asd6t9asrdia8sd';

const login = async (req, res, next) => {
  const { body } = req;
  try {
    const user = await userModel.getUserByLogin(body.login);
    if (!user) {
      return res.render('login', { error: { message: 'Incorrect login' } });
    }
    const originalPassword = CryptoJS.AES.decrypt(user?.password, AUTH_CRYPTO_KEY).toString(CryptoJS.enc.Utf8);

    if (originalPassword !== body.password) {
      return res.render('login', { error: { message: 'Incorrect password' } });
    } else {
      req.session.userId = user._id;
      res.redirect('/');
    }
  } catch (e) {
    console.log(e);
    if (e.name === 'MongoError') {
      return next(e);
    }
    next(new ResWithMessage(500));
  }
};

const logout = async (req, res, next) => {
  try {
    req.session.destroy(err => {
      res.clearCookie('game-catch');
      res.redirect('/');
    });
  } catch (e) {
    next(new ResWithMessage(500));
  }
};

const signup = async (req, res, next) => {
  const { body } = req;
  try {
    const sanitizedUser = await sanitize(body);
    const validatedUser = await validate(sanitizedUser);
    const securPass = CryptoJS.AES.encrypt(validatedUser.password, AUTH_CRYPTO_KEY).toString();

    const createdUser = await userModel.createUser({
      ...validatedUser,
      password: securPass,
      registrationDate: new Date(),
      registrationIP: req.ip || '',
    });

    res.redirect('/auth/login');

  } catch (e) {
    if (e.invalidInputData) {
      return res.render('signup', { error: { message: e.message } });
    }
    if (e.name === 'MongoError') {
      return next(e);
    }
    next(new ResWithMessage(500));
  }
};

module.exports = { login, logout, signup };
