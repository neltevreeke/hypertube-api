const bcrypt = require('bcryptjs')
const User = require('../models/User')
const config = require('../config')

module.exports = app => {
  app.post('/new-password', async (req, res, next) => {
    const {
      password,
      token
    } = req.body

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    const compareToken = await bcrypt.compare(config.PASSWORD_RESET_SECRET, token)

    if (compareToken) {
      await User.findOneAndUpdate({
        passwordResetToken: token
      }, {
        password: hashPassword
      })
    }

    res.json({
      status: 200
    })
  })

  return app
}
