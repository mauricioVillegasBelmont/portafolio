const express = require('express');
module.exports = function( controller ) {
  const router = express.Router();
  return controller(router)
}