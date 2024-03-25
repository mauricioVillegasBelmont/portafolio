const { body,validationResult } = require('express-validator');
const validationBodyRules  = [
  body('token').exists(),
  body('nombre').exists().notEmpty(),
  body('email').exists().notEmpty().trim().isEmail(),
  body('mensaje').exists().notEmpty(),
]

const validateInputs = async function(req, res, next) {
    for (let validation of validationBodyRules) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: 'fail',
        message:'¡Algo salio mal!. Intenta nuevamente mas tarde.',
        errors: errors.array()
      });
      return
    }
    return next();

};

module.exports = {
  validateInputs
};