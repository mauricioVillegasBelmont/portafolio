const compression = require("compression");
const helmet = require("helmet");
const RateLimit = require("express-rate-limit");



module.exports = function (app){
  app.use(compression());

  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        scriptSrc: ["'self'", (req, res) => `'nonce-${res.locals.cspNonce }'` ],
        childSrc:["'self'","https://www.google.com/","https://www.youtube.com/", "https://mauriciovillegasbelmont.github.io/", "https://*.d-link.mx/", "https://parentesis.com/","https://harmonia.la/","https://shambalante.com/","https://vlyt.mx/"],
      }
    },
    dnsPrefetchControl:{
      allow: true,
    }
  }));

  const rateLimiter = RateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 20,
  });
  app.use(rateLimiter);

}