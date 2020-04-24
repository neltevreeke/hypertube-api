const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const LinkedinStrategy = require('passport-linkedin-oauth2').Strategy
const FortyTwoStrategy = require('passport-42').Strategy
const config = require('../config')
const passportUtils = require('../utils/passport')

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

passport.use(new FortyTwoStrategy({
  clientID: config.FORTYTWO.clientID,
  clientSecret: config.FORTYTWO.clientSecret,
  callbackURL: config.FORTYTWO.callback
}, async (accessToken, refreshToken, profile, done) => {
  const user = await passportUtils.getOrCreateUser(profile)

  done(null, user)
}))

passport.use(new LinkedinStrategy({
  clientID: config.LINKEDIN.consumerKey,
  clientSecret: config.LINKEDIN.consumerSecret,
  callbackURL: config.LINKEDIN.callback,
  profileFields: ['email-address'],
  scope: ['r_emailaddress', 'r_liteprofile']
}, async (accessToken, tokenSecret, profile, done) => {
  const user = await passportUtils.getOrCreateUser(profile)

  done(null, user)
}))

passport.use(new FacebookStrategy({
  clientID: config.FACEBOOK.clientID,
  clientSecret: config.FACEBOOK.clientSecret,
  callbackURL: config.FACEBOOK.callback,
  enableProof: false,
  profileFields: ['email', 'displayName']
}, async (accessToken, refreshToken, profile, done) => {
  const user = await passportUtils.getOrCreateUser(profile)

  done(null, user)
}))
