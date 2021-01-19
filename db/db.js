const mongoose = require('mongoose');

const MONGO_URI =
  process.env.MONGO_URI ||
  'mongodb+srv://admin:MYB0Xdcm4wfsBod3@game-catch.h273r.mongodb.net/game-catch?retryWrites=true';

const connectToDB = async () => {
  return await mongoose.connect(MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  });
};

module.exports = { connectToDB };
