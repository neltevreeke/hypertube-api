const User = require('../models/User')

module.exports = app => {
  app.post('/signup', async (req, res, next) => {
    const {
      username,
      firstName,
      lastName,
      displayName,
      email,
      password
    } = req.body

    try {
      await User.create({
        username,
        firstName,
        lastName,
        displayName,
        logInEmail: email,
        email,
        password
      })

      res.json({
        status: 200
      })
    } catch (e) {
      const error = new Error('conflict')
      error.statusCode = 409
      return next(error)
    }
  })

  return app
}
