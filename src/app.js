const express = require('express')
const cors = require('cors')
const requireDir = require('require-dir')
const bodyParser = require('body-parser')
const errorHandler = require('./middleware/errorHandler')
const app = express()
const passport = require('passport')
const sgMail = require('@sendgrid/mail')
const config = require('./config')

app.use(cors())
app.use(bodyParser.json())
require('./config/passport')
app.use(passport.initialize())
sgMail.setApiKey(config.SENDGRID_API_KEY)

const routes = requireDir('./routes')

Object
  .values(routes)
  .forEach(route => route(app))

app.use(errorHandler)

module.exports = app
