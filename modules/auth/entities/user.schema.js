const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  login: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  registrationDate: { type: Date, required: true },
  registrationIP: { type: String },
});

module.exports = { userSchema };
