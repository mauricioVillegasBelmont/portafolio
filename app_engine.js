const express = require("express");
const app = express();
const path = require('path');

global.__basedir = path.join(__dirname, '');

const config = require('./config')
const {
  setModules,
  ORMInit,
} = require('./app_modules');

async function init() {

  config.environment(app);
  if (process.env.NODE_ENV === 'production') config.production(app);

  await ORMInit();
  await setModules(app);
}
init()





const port = process.env.PORT || 3000;
app.listen(port, function (error) {
  if (error) console.error(error);
  console.log(`Example app listening at http://${ process.env.HOSTNAME }:${port}/!`);
});
