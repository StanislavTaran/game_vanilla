const messages = {
  signup: {
    login: {
      notUniq: 'This login is already taken!',
      invalidLength: 'Your login should be from 2 to 15 characters!',
      invalidContent: 'Only small Latin letters and numbers allowed for login!',
    },
    name: {
      invalidLength: 'Your name should be at least 1 character!',
      invalidContent: 'Your name must contain Latin or Cyrillic letters!',
    },
    password: {
      invalidLength: 'Your password should be at least 8 characters!',
      notMatch: "Passwords don't match",
      incorrectPassword: 'Incorrect password',
    },
  },
};

module.exports = { messages };
