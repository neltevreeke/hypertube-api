const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const LinkedinStrategy = require('passport-linkedin-oauth2').Strategy
const config = require('../config')
const User = require('../models/User')
const tokenUtils = require('../utils/token')

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

passport.use(new LinkedinStrategy({
  clientID: config.LINKEDIN.consumerKey,
  clientSecret: config.LINKEDIN.consumerSecret,
  callbackURL: config.LINKEDIN.callback
  // scope: ['r_emailaddress']
}, async (accessToken, tokenSecret, profile, done) => {
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

passport.use(new FacebookStrategy({
  clientID: config.FACEBOOK.clientID,
  clientSecret: config.FACEBOOK.clientSecret,
  callbackURL: config.FACEBOOK.callback,
  enableProof: false,
  profileFields: ['email']
}, async (accessToken, refreshToken, profile, done) => {
  // todo: get users profile image

  // console.log(profile.emails[0].value)

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
