const mongoose = require('mongoose');

const resultSchema = mongoose.Schema({
  name: { type: String, required: true },
  score: { type: Number, required: true },
  userId: { type: mongoose.ObjectId, required: true },
  date: { type: String, required: true },
});

module.exports = { resultSchema };
