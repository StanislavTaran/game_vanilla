const sanitize = async data => {
  for (key in data) {
    if (typeof data[key] === 'string') {
      data[key] = data[key].trim();
    }
  }
  return data;
};

module.exports = { sanitize };
