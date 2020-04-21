const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const config = require('../config')
const User = require('../models/User')
const tokenUtils = require('../utils/token')

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

passport.use(new FacebookStrategy({
  clientID: config.FACEBOOK.clientID,
  clientSecret: config.FACEBOOK.clientSecret,
  callbackURL: config.FACEBOOK.callback,
  enableProof: false
}, async (accessToken, refreshToken, profile, done) => {
  // todo: get users profile image

  let user

  user = await User.findOne({
    providerId: profile.id
  })
    .lean()
    .exec()

  if (!user) {
    user = await User.create({
      username: profile.displayName,
      providerId: profile.id
    })
  }

  const token = await tokenUtils.create(user._id)

  const userData = {
    user,
    token
  }

  done(null, userData)
}))
