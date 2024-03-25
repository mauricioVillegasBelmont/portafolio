const {pageDict} = require('../helpers/dicts');


const importModels = async function(req, res, next){
  const orm = require('../orm');
  const portafolio = await orm.models.portfolio();
  await orm.sequelize.sync()
  var model = await portafolio.page(req.params.id);
  if (  model == null || model == undefined ) return res.status(404).redirect('/');
  res.locals.model = await portafolio.beautify( model );
  res.locals.model.features = model.features;
  next();
}

const setDicts = async function(req, res, next){
  const pageData = res.locals.model;
  const _default = {
    body_classes:'d--flex flex__direction--column',
    deviceRestriction: pageData.device == 'desktop' || pageData.device == 'mobil',
    mobil_only:pageData.device == 'mobil',
    nonce: `${res.locals.cspNonce}`,
  }
  const dict = pageDict(_default, pageData);
  dict.setPageLibs(pageData.type, res.locals.cspNonce);
  res.locals.dict = dict.getDict();
  res.locals.tmpl = dict.getTemplate( pageData.type );
  next();
}




module.exports = {

  initRouter: function(router){
    router.get('/:id',
      [
        importModels,
        setDicts,
      ],
      function (req, res) {
        res.render( res.locals.tmpl, res.locals.dict);
      }
    );
    return router;
  },

}
