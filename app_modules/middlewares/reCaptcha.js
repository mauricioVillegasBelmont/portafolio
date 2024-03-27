const verifyReCaptcha = async function(req, res, next) {
  const POSTDATA = {
    secret:process.env.RECAPTCHA_BACKEND_KEY,
    response:req.body.token,
    remoteip:req.connection.remoteAddress
  };
  const VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";
  try{
    const response = await fetch(VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(POSTDATA),
    });
    const data = await response.json();
    res.locals.recaptcha = data;
    return next();

  } catch(error) {
    console.error(error);
    res.status(400).json({
      status: 'fail',
      message:`¡Algo salio mal!. tambien puedes contactarme en <a href="mailto:${process.env.SENDGRID_TO}" class="text--underline">${process.env.SENDGRID_TO}</a>.`,
      errors: error
    });
    return;
  }
};

module.exports = {
  verifyReCaptcha
};