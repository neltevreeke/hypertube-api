const passport = require('passport')

module.exports = app => {
  app.post('/login', async (req, res, next) => {
    // eslint-disable-next-line no-console
    console.log(req.body)
  })

  app.get('/auth/facebook', passport.authenticate('facebook'))

  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: 'http://localhost:3000/movies',
    failureRedirect: 'http://localhost:3000/',
    scopes: {}
  }))

  return app
}
