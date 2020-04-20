const passport = require('passport')

module.exports = app => {
  // Facebook
  app.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['email']
  }))

  // app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  //   failureRedirect: 'http://localhost:3000/',
  //   session: false
  // }), (req, res) => {
  //   res.redirect('http://localhost:3000?token=' + token)
  // })

  app.get('/logout', (req, res) => {
    req.logout()
    res.json({
      success: true
    })
  })

  return app
}
