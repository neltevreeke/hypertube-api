const passport = require('passport')

module.exports = app => {
  // Facebook
  app.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['email']
  }))

  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    session: false
  }), (req, res) => {
    res.json({
      user: req.user.user,
      token: req.user.token
    })
  })

  app.get('/logout', (req, res) => {
    req.logout()
    res.json({
      success: true
    })
  })

  return app
}
