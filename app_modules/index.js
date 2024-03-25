const orm = require('./orm');



const controller = require('./controllers');
const routerFactory = require('./router');
const app_modules = [
  {path: '/', controller: controller.home },
  {path: '/contact', controller: controller.contact },
  {path: '/portafolio', controller: controller.portfolio },
];

module.exports = {
  ORMInit: async function() {
    await orm.init()
  },
  setModules: function(app){

    for (let obj of app_modules){
      const path  = obj.path;
      const controller =  routerFactory(obj.controller.initRouter);
      app.use(path, controller);
    }

    app.use(function(req,res){
      res.redirect('/');
    });

  },
}
