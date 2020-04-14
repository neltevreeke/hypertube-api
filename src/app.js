const express = require('express')

const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const keys = require('./strategyKeys')
const cors = require('cors')
const requireDir = require('require-dir')
const bodyParser = require('body-parser')
const errorHandler = require('./middleware/errorHandler')

passport.use(new FacebookStrategy({
  clientID: keys.FACEBOOK.clientID,
  clientSecret: keys.FACEBOOK.clientSecret,
  callbackURL: 'http://localhost:4000/auth/facebook/callback'
}, (accessToken, refreshToken, profile, callback) => {
  // console.log('decide what to do with profile...')
  // console.log(profile)

  return callback(null, profile)
}))

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(passport.initialize())

passport.serializeUser((user, callback) => {
  callback(null, user)
})

passport.deserializeUser((user, callback) => {
  callback(null, user)
})

const routes = requireDir('./routes')

Object
  .values(routes)
  .forEach(route => route(app))

app.use(errorHandler)

module.exports = app
