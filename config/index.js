const path = require('path');
const dotenv = require('dotenv');
const result = dotenv.config();
if (result.error) {
  throw result.error;
}




module.exports = {
  environment:   require('./environment'),
  production:   require('./production'),
}