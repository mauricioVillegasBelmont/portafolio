/*
  config Environment Contants from file
*/
const path = require('path');
const express = require("express");
const bodyParser = require('body-parser');
const _handlebars = require('express-handlebars')
const crypto = require('crypto')


const handlebars = _handlebars.create({
  helpers: {
    raw: function (a) { return a; }
  }
});


module.exports = function (app){
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());


  app.use((req, res, next) => {
    if (req.url.endsWith('.bundle.css')) {
      res.setHeader('Link', `<${req.url}>; rel="preload"; as="style"`);
    }
    next();
  });

  app.use(process.env.STATIC_DIR, express.static( path.join( __basedir, process.env.WEBPACK_OUTPUT) ));

  app.engine('handlebars', handlebars.engine);
  app.set('view engine', 'handlebars');
  app.set('views', path.join( __basedir, 'app_modules/views') );


  app.use(function (req, res, next) {
    const nonce = `${crypto.randomBytes(32).toString("hex")}` ;
    res.locals.cspNonce = nonce;
    next()
  })


}
