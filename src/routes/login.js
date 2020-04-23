const passport = require('passport')

module.exports = app => {
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
