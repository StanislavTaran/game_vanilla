const mongoose = require('mongoose');
const { resultSchema } = require('./entities/result.schema');

class Result {
  constructor() {
    this.result = mongoose.model('result', resultSchema);
  }

  getResults = async (query = {}) => {
    return await this.result
      .find(query)
      .then(docs => docs)
      .catch(error => {
        throw error;
      });
  };

  getTop10Results = async () => {
    return await this.result
      .find({})
      .sort({ score: -1 })
      .limit(10)
      .then(docs => {
        return docs;
      })
      .catch(error => {
        throw error;
      });
  };

  getBestResultsById = async userId => {
    return await this.result
      .find({ userId })
      .sort({ score: -1 })
      .limit(1)
      .then(doc => doc)
      .catch(error => {
        throw error;
      });
  };

  getGamesQtyById = async userId => {
    return await this.result
      .find({ userId })
      .count()
      .then(doc => doc)
      .catch(error => {
        throw error;
      });
  };

  getResultsByName = async name => {
    return await this.result
      .find({ name })
      .then(doc => doc)
      .catch(error => {
        throw error;
      });
  };

  saveResult = async data => {
    return await this.result
      .create(data)
      .then(doc => doc)
      .catch(error => {
        throw error;
      });
  };
}

module.exports = new Result();
