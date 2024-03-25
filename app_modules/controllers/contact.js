const { validateInputs } =  require('../middlewares/fomValidation');
const { verifyReCaptcha } =  require('../middlewares/reCaptcha');
const { mailMe } =  require('../middlewares/mailer');


module.exports = {
  initRouter:function(router){
    router.post("/",
      [
        validateInputs,
        verifyReCaptcha,
        mailMe
      ],
      function (req, res, next) {
        res.status(200).json({status:'ok'});
      }
    );
    return router;
  }
}
