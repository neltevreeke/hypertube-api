const bcrypt = require('bcryptjs')
const User = require('../models/User')
const config = require('../config')
const sgMail = require('@sendgrid/mail')

module.exports = app => {
  app.post('/reset-password', async (req, res, next) => {
    const {
      passwordResetEmail
    } = req.body

    const salt = await bcrypt.genSalt(10)
    const passwordResetToken = await bcrypt.hash(config.PASSWORD_RESET_SECRET, salt)

    await User.findOneAndUpdate({
      logInEmail: passwordResetEmail
    }, {
      passwordResetToken
    })

    const msg = {
      to: passwordResetEmail,
      from: 'no-reply@hypertube.com',
      subject: 'Password reset requested',
      html: `Dear user, <br/>
        It has come to our attention that you forgot your password!<br/>
        By clicking the following link you will be taken to the page where you can enter your new password.<br/><br/>
        <a href="http://localhost:3000/new-password?token=${passwordResetToken}">Reset my password!</a><br/><br/>
        Kind regards, hypertube
      `
    }

    await sgMail.send(msg)

    res.sendStatus(200)
  })

  return app
}
