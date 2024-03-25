const sgMail = require('@sendgrid/mail')
sgMail.setApiKey( process.env.SENDGRID_API_KEY )


const mailMe = async function(req, res, next){
  if (! res.locals.recaptcha.success) {
    /*
      TODO log req.connection.remoteAddress for block ths bot
    */
    return next();
  }
  const {nombre,email,mensaje}  = req.body
  const msg = {
    to: process.env.SENDGRID_TO, // Change to your recipient
    from: process.env.SENDGRID_SENDER,
    subject: `${process.env.SENDGRID_SUBJECT} - ${nombre}`,
    text: `${mensaje} ------------------- ${nombre} ------------------- ${email}`,
    html:`<p>${mensaje} <br><br>-------------------<br><strong>${nombre}</strong><br>-------------------<br> ${email}</p>`,
  }
  try {
    await sgMail.send(msg);
    return next();
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      status: 'fail',
      message: '¡Algo salió mal! También puedes contactarme en <a href="mailto:SENDGRID_TO" class="text--underline">SENDGRID_TO</a>.',
      errors: error,
    });
  }
}

module.exports = {
  mailMe
};