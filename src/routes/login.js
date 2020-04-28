const passport = require('passport')
const User = require('../models/User')
const tokenUtils = require('../utils/token')

module.exports = app => {
  // Local
  app.post('/login', async (req, res, next) => {
    try {
      const {
        email,
        password
      } = req.body

      const user = await User.getAuthenticatedUser(email, password)
      const token = await tokenUtils.create(user._id.toString())

      const userObject = user.toObject()

      delete userObject.password
      delete userObject.__v

      res.json({
        user: userObject,
        token
      })
    } catch (e) {
      next(e)
    }
  })

  // Facebook
  app.get('/auth/facebook', passport.authenticate('facebook', {
    scope: 'email'
  }))

  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    session: false
  }), (req, res) => {
    res.json({
      user: req.user.user,
      token: req.user.token
    })
  })

  // linkedin
  app.get('/auth/linkedin', passport.authenticate('linkedin', {
    scope: ['r_emailaddress', 'r_liteprofile']
  }))

  app.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
    session: false
  }), (req, res) => {
    res.json({
      user: req.user.user,
      token: req.user.token
    })
  })

  // 42 network
  app.get('/auth/fortytwo', passport.authenticate('42'))

  app.get('/auth/fortytwo/callback', passport.authenticate('42', {
    session: false
  }), (req, res) => {
    res.json({
      user: req.user.user,
      token: req.user.token
    })
  })

  return app
}
