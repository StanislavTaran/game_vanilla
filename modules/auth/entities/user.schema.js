const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const userSchema = mongoose.Schema({
  login: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['gamer', 'admin'],
    default: 'gamer',
  },
  registrationDate: { type: Date, required: true },
  registrationIP: { type: String },
});

userSchema.plugin(mongoosePaginate);

module.exports = { userSchema };
