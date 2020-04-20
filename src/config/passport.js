const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const config = require('../config')

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

passport.use(new FacebookStrategy({
  clientID: config.FACEBOOK.clientID,
  clientSecret: config.FACEBOOK.clientSecret,
  callbackURL: 'http://localhost:3000/auth/facebook/callback',
  enableProof: false
}, (accessToken, refreshToken, profile, done) => {
  // todo: set user in database
  const userData = {
    username: profile.displayName,
    token: accessToken
  }

  done(null, userData)
}))
