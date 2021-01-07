const got = require('got');

const PORT = process.env.PORT || 9090;

const BASE_URL = `http://localhost:${PORT}`;
const TASKS_PATH = '/api/tasks';

const postToRoute = async (path = '/', data) => {
  try {
    const res = await got.post(`${BASE_URL}${TASKS_PATH}${path}`, {
      json: data,
      responseType: 'json',
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

module.exports = { postToRoute };
