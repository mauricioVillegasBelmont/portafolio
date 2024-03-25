const {pageDict} = require('../helpers/dicts');



const getProjects = async function (req, res, next) {

  const orm = require('../orm');
  const portafolio = await orm.models.portfolio();
  await orm.sequelize.sync()
  var model = await portafolio.itemsList();
  model = await portafolio.beautify( model );

  res.locals.list = model;
  next();
}

const sortProjects = function(req, res, next) {
  var elememnts = {}
  res.locals.list.sort(() => Math.random() - 0.5)
  for (let item of res.locals.list){
    if (elememnts[item.type] === undefined) elememnts[item.type] = [];
    elememnts[item.type].push( item )
  }

  res.locals.list = elememnts;
  next();
}

const indexDict = function (req, res, next) {
  const _default = {
    TITLE: `Mauricio Villegas Belmont`,
    links: res.locals.list,
    RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_FRONTEND_KEY,
    _nonce:res.locals.cspNonce
  };
  const dict = pageDict(_default);
  dict.setPageLibs('index', res.locals.cspNonce);
  res.locals.dict = dict.getDict();
  res.locals.tmpl = dict.getTemplate('index');
  next();
}





module.exports = {

  initRouter :function(router){

    router.get('/',
      [ getProjects, sortProjects, indexDict],
      function(req, res) {
        res.render(res.locals.tmpl, res.locals.dict);
      }
    );
    return router;
  }
}
