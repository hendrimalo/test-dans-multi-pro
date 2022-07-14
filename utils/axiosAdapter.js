const axios = require('axios');

module.exports = (baseUrl) => axios.create({
  baseURL: baseUrl,
  timeOut: 3000,
});
