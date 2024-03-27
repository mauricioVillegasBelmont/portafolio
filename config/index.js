const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');

const envFilePath = path.resolve(__basedir, '.env');
if (fs.existsSync(envFilePath)) {
  const result = dotenv.config();
  if (result.error) {
    throw result.error;
  }
}





module.exports = {
  environment:   require('./environment'),
  production:   require('./production'),
}